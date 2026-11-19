const Hotel = require("../models/Hotel");

exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};

exports.addHotel = async (req, res) => {
  const hotel = new Hotel(req.body);
  await hotel.save();
  res.json(hotel);
};
