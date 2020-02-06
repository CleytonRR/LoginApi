const VerifyToken = require('../util/verifyToken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (VerifyToken.verify(token)) {
    next()
  } else {
    return res.status(401).send({ message: 'Authentication failure' })
  }
}
