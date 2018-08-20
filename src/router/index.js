import Vue from 'vue'
import Router from 'vue-router'
import updateOperative from '../components/eco-kre-update/index'
import uploadFile from '../components/eco-edit-lab/uploadFile'
import ecoFileEdit from '../components/eco-lab-edit/index'
import ecoAvailable from '../components/eco-available/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'updateOperative',
      component: updateOperative
    },
    {
      path: '/eco-lab-edit',
      name: 'eco-lab-edit',
      component: ecoFileEdit
    },
    {
      path: '/eco-available',
      name: 'eco-available',
      component: ecoAvailable
    },
    {
      path: '/upload',
      name: 'upload',
      component: uploadFile
    }
  ]
})
