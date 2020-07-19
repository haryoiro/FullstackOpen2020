const getTokenFrom = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

module.exports = getTokenFrom
