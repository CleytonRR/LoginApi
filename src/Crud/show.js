const User = require('../model/UserModel')

class showUser {
  static async checkUserExists (email) {
    try {
      const response = await User.findOne({
        where: { email }
      })

      if (response === null) {
        return false
      }
      return true
    } catch (error) {
      console.log('Internal Error')
    }
  }
}

module.exports = showUser
