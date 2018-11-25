module.exports = {
  getToken: function () {
    return localStorage.token
  },
  setToken: function (data) {
    localStorage.token = data
  }
}
