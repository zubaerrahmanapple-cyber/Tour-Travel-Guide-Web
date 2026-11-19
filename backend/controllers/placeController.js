const Place = require("../models/Place");

exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  res.json(places);
};

exports.addPlace = async (req, res) => {
  const place = new Place(req.body);
  await place.save();
  res.json(place);
};
