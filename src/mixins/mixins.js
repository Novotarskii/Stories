module.exports = {
  data: function () {
    return {
      msg: {
        first_name: "Ім'я користувача",
        last_name: 'Пароль',
        email: 'Email'
      }
    }
  },
  methods: {
    cleanInput: function (name) {
      let data = document.getElementById(name)
      data.value = ''
    },
    checkInput: function (name) {
      return name !== ''
    }
  }
}
