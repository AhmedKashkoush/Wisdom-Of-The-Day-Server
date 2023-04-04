const jwt = require('jsonwebtoken')
const { failure } = require('../public/response')
const isSignedIn = (req, res, next) => {
  try {
    const accessToken = req.headers['access-token']
    if (!accessToken) return failure(res, { code: 400, message: 'bad request' })
    if (!accessToken.includes('Bearer'))
      return failure(res, { code: 401, message: 'unauthenticated' })
    const token = accessToken.split(' ')[1]
    const isVerified = jwt.verify(token, 'user')
    if (!isVerified) return failure(res, { code: 403, message: 'unauthorized' })
    next()
  } catch (error) {
    failure(res, error)
  }
}

module.exports = { isSignedIn }
