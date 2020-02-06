const validatorEmail = require('../util/emailValidator')
const validatorPassword = require('../util/passwordValidator')
const showUser = require('../Crud/show')
const GeneratorToken = require('../util/generatorToken')

module.exports = {
  async authenticar (req, res) {
    try {
      if (!validatorEmail.testEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email' })
      }

      if (!validatorPassword.testePass(req.body.password)) {
        return res.status(400).json({ message: 'Password should have length 8 and a letter and a number a special character and a letter capslock' })
      }

      if (await showUser.checkUserExists(req.body.email) === false) {
        return res.status(401).json({ message: 'User not exists' })
      }
      const dados = await showUser.checkUserExists(req.body.email)
      const token = GeneratorToken.token(dados[1].id, dados[1].email)
      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' })
    }
  }
}
