function openPlace(place){
  window.location.href = "place.html?place=" + encodeURIComponent(place);
}

function openBooking(place){
  window.location.href = "booking.html?place=" + encodeURIComponent(place);
}

function openHotelBooking(hotel){
  window.location.href = "booking.html?hotel=" + encodeURIComponent(hotel);
}


// Toggle chat window
document.getElementById("chatBtn").addEventListener("click", () => {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
});

// Send chat message
async function sendChat() {
  const input = document.getElementById("userInput").value;
  if (!input) return;

  const chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML += `<p><strong>You:</strong> ${input}</p>`;

  try {
    const res = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }) // ✅ key অবশ্যই "question"
    });

    const data = await res.json();
    chatMessages.innerHTML += `<p><strong>Bot:</strong> ${data.answer}</p>`;
  } catch (err) {
    chatMessages.innerHTML += `<p style="color:red;"><strong>Error:</strong> Could not connect to backend.</p>`;
    console.error("Chat error:", err);
  }

  document.getElementById("userInput").value = "";
}
document.getElementById("userInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    sendChat();
  }
});