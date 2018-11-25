import Vue from 'vue'
import Router from 'vue-router'
import Registration from '@/components/Registration'
import Into from '@/components/Into'
import Home from '@/components/Home'
import Stories from '@/components/Stories'
import AddStory from '@/components/AddStory'
import Story from '@/components/Story'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/Into',
      name: 'Into',
      component: Into
    },
    {
      path: '/Stories',
      name: 'Stories',
      component: Stories
    },
    {
      path: '/AddStory',
      name: 'AddStory',
      component: AddStory
    },
    {
      path: '/Story',
      name: 'Story',
      component: Story
    }
  ]
})

Vue.use(Router)
