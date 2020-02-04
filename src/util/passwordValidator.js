class validatorPassword {
  static testePass (password) {
    const regexTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!regexTest.test(password)) {
      return false
    }
    return true
  }
}

module.exports = validatorPassword
