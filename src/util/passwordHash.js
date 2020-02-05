const bcript = require('bcrypt')

class PassHash {
  static async generatorHash (password) {
    const saltsRounds = 10
    const response = await bcript.hash(password, saltsRounds)
    return response
  }

  static async compareHash (password, hash) {
    const response = await bcript.compare(password, hash)
    return response
  }
}

module.exports = PassHash
