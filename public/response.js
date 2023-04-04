const success = (res, options) => {
  const { code, data, message, token } = options
  res.status(code || 200).json({
    status: 'success',
    code: code || 200,
    data,
    message,
    token
  })
}

const failure = (res, options) => {
  const { code, message } = options
  res.status(code || 500).json({
    status: 'failure',
    code: code || 500,
    message
  })
}

module.exports = {
  success,
  failure
}
