
const regExpEscape = (str) => {
  return str.replace(/[-\\^$*+?.()|\]{}]/g, '')
}

module.exports = {
  regExpEscape
}