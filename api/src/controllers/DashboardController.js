const Spot = require('./../models/Spot');
const User = require('./../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;

    const user_exists = await User.findById(user_id);

    if (!user_exists) {
      return res.status(400).json({ error: 'User doest not exists'});
    }

    const spots = await Spot.find({ user: user_id });

    return res.json(spots);
  }
}
