<template>
  <div>
  <div class="navbar">
    <a href="/Stories">Stories</a>
    <a href="/Into" @click="this.onExit">Exit</a>
  </div>
    <h1>{{this.title }}</h1>
    <h2>{{this.history}}</h2>
  </div>
</template>

<script>
import axios from 'axios'
import token from '../storage-token.js'
export default {
  name: 'Story',
  data () {
    return {
      title: '',
      history: ''
    }
  },
  methods: {
    onExit: function () {
      token.setToken('')
    }
  },
  beforeMount: async function () {
    try {
      axios.defaults.headers.get['Authorization'] = token.getToken()
      await axios.get('http://localhost:3000/checkAcc')
    } catch (err) {
      console.log(err)
      this.$router.push('/Into')
    }
  },
  mounted () {
    this.title = this.$router.history.current.query.title
    this.history = this.$router.history.current.query.text
  }
}
</script>

<style scoped>

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

</style>
