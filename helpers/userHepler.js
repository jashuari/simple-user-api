const User = require('../db/models/user.model')
exports.findByIdAndRemove = async (req, res) => {
  await User.destroy({ where: { username: 'ariPovio' } })
  return res.status(200).send()
}
