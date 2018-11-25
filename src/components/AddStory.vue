<template>
    <div>
      <div class="navbar">
        <a href="#/Stories">Stories</a>
        <a href="#/Into" @click="this.onExit">Exit</a>
      </div>
      <form>
        <label >Add Story</label>
        <input type="text" id="titleText" name="fname" placeholder="Input text">
      </form>
      <textarea id="inputText" placeholder="Input story"></textarea>
      <button type="submit" class="btn" @click="getStory">Add Story</button>
      <button type="submit" class="btn" @click="getImg">Select image</button>
    </div>
</template>

<script>
import axios from 'axios'
import token from '../storage-token.js'
export default {
  name: 'AddStory',
  data () {
    return {
      id: '',
      img: '',
      title: '',
      text: ''
    }
  },
  methods: {
    onExit: function () {
      token.setToken('')
    },
    getImg: function () {
      this.img = prompt('insert the link to the picture', 'link')
      console.log(this.img)
    },
    getStory: function () {
      this.title = document.getElementById('titleText').value
      this.text = document.getElementById('inputText').value
      this.saveStoryToDB()
    },
    saveStoryToDB: async function () {
      var story = {
        title: this.title,
        text: this.text,
        image: this.img
      }
      try {
        if (story.title === '' || story.text === '' || story.image === '') {
          alert('Fill in all the fields')
        } else {
          axios.defaults.headers.post['Authorization'] = token.getToken()
          await axios.post('http://localhost:3000/addStory', story)
          alert('Історію додано')
        }
      } catch (err) {
        alert('In saveStoryToDB ' + err)
      }
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

  input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 3px solid #ccc;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
  }

  input[type=text]:focus {
    border: 3px solid #555;
  }

  textarea {
    width: 100%;
    height: 350px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
  }

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
