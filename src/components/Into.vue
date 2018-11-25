<!--suppress ALL -->
<template>
  <div class="bg-img">
    <div class="navbar">
      <a href="/">Home</a>
      <a href="/Registration">Registration</a>
    </div>
    <form class="container">
      <h1>Login</h1>

      <label for="named"><b>Name</b></label>
      <input id="name" type="text" class="form-control" :placeholder="msg.first_name" v-model="user.first_name">

      <label for="psw"><b>Password</b></label>
      <input id="pass" type="text" class="form-control" :placeholder="msg.last_name" v-model="user.last_name">

      <button type="submit" class="btn" @click="addToApi()">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import mix from '../mixins/mixins.js'
import token from '../storage-token.js'

export default {
  name: 'Into',
  mixins: [mix],
  data () {
    return {
      user: {
        first_name: '',
        last_name: ''
      },
      user_id: ''
    }
  },
  methods: {
    addToApi: async function () {
      this.msg.first_name = "Ім'я користувача"
      this.msg.last_name = 'Пароль'
      let acc = {
        first_name: this.user.first_name,
        last_name: this.user.last_name
      }
      if (this.checkInput(acc.first_name) === false) {
        this.msg.first_name = 'Введіть будь ласка дані'
        return
      }
      if (this.checkInput(acc.last_name) === false) {
        this.msg.last_name = 'Введіть будь ласка дані'
        return
      }
      try {
        let data = await axios.post('http://localhost:3000/into', acc)
        token.setToken(data.data)
        this.$router.push('/Stories')
      } catch (err) {
        alert('Логін або пароль не вірний')
      }
    }
  }
}
</script>

<style scoped>
  body, html {
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  .navbar {
    overflow: hidden;
    background-color: #333;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .navbar a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  .navbar a:hover {
    background: #ddd;
    color: black;
  }

  .bg-img {
    /* The image used */
    background-image: url("http://www.setwalls.ru/pic/201505/1920x1080/setwalls.ru-79505.jpg");
    margin-top: -100px;
    margin-left: -10px;
    margin-right: -8px;
    background-size: cover;
    min-height: 610px;

  }

  /* Add styles to the form container */
  .container {
    position: absolute;
    right: 0px;
    margin: 100px;
    max-width: 300px;
    padding: 16px;
    background-color: white;
  }

  /* Full-width input fields */
  input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    border: none;
    background: #f1f1f1;
  }

  input[type=text]:focus, input[type=password]:focus {
    background-color: #ddd;
    outline: none;
  }

  /* Set a style for the submit button */
  .btn {
    background-color: #4CAF50;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }

  .btn:hover {
    opacity: 1;
  }
</style>
