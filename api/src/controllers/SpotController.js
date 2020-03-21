const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, price, techs } = req.body;
    const { user_id } = req.headers;

    const user_exists = await User.findById(user_id);

    if (!user_exists) {
      return res.status(400).json({ error: 'User doest not exists'});
    }

    let spot = await Spot.findOne({ user: user_id, company });

    if(!spot) {
      spot = await Spot.create({
        user: user_id,
        thumbnail: filename,
        company,
        techs: techs.split(',').map(tech => tech.trim()),
        price
      })
    }

    return res.json(spot);
  }
}
