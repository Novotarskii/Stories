<template>
  <body>
    <div class="navbar">
      <a href="/Into" @click="this.onExit">Exit</a>
    </div>
      <div class="container" v-for="item in stories" :key="item.idOfUser" @click="goToStory(item.titleOfHistory, item.textOfHistory)">
        <img :src="item.img" alt="Notebook" style="width:100%;">
        <div class="content">
          <h1>{{item.titleOfHistory}}</h1>
          <p>{{item.textOfHistory}}</p>
        </div>
      </div>
    <button type="submit" class="btn" @click="this.goToAddStory">Add Story</button>
  </body>
</template>

<script>
import token from '../storage-token.js'
import axios from 'axios'

export default {
  name: 'Stories',
  data () {
    return {
      stories: {}
    }
  },
  methods: {
    onExit: function () {
      token.setToken('')
    },
    goToAddStory: function () {
      this.$router.push('/AddStory')
    },
    goToStory: function (title, text) {
      this.$router.push({path: '/Story', query: {title, text}})
    }
  },
  beforeMount: async function () {
    try {
      alert(token.getToken())
      axios.defaults.headers.get['Authorization'] = token.getToken()
      await axios.get('http://localhost:3000/checkAcc')
      let data = await axios.get('http://localhost:3000/getStories')
      this.stories = data.data
    } catch (err) {
      alert(err)
      this.$router.push('/Into')
    }
  }
}
</script>

<style scoped>
  body {margin:0;}

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

  * {
    box-sizing: border-box;
  }
  body {
    font-family: Arial;
    font-size: 17px;
  }

  .container {
    position: relative;
    max-width: 600px;
    margin-left: 10px;
    float: left;
  }

  .container img {vertical-align: middle;}

  .container .content {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0); /* Fallback color */
    background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
    color: #f1f1f1;
    width: 100%;
  }

  /* Set a style for the submit button */
  .btn {
    background-color: #4CAF50;
    color: white;
    padding: 16px 20px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    width: 25%;
    opacity: 0.9;
  }
</style>
