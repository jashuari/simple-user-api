const handleError = (res = {}, err = {}) => {
  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message,
    },
  })
}

module.exports = { handleError }
