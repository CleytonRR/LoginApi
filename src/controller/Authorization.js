module.exports = {
  async private (req, res) {
    return res.status(200).json({ message: 'Successfully authenticated' })
  }
}
