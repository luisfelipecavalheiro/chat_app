
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld.vue'
import Cadastra from '@/components/Cadastra'
import Chat from '@/components/Chat'

/** Cadastra as rotas utilizadas pelo router-view */

Vue.use(Router)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,        
    },
    {
        name: 'cadastra',
        path: '/cadastra',
        component: Cadastra,        
    },
    {
        name: 'chat',
        path: '/chat',
        component: Chat,        
    },    

]

const router = new Router({ routes })

export default router