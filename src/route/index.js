import Vue from 'vue'
import VueRouter from 'vue-router'

// ///////////
// Pages
// ///////////
import HomePage from '../view/Home'
import MultipleSelectPage from '../view/MultipleSelect/Home'
import MultipleSelectMain from '../view/MultipleSelect/Main'
// ///////////
// Routers
// ///////////
console.log('process.env', process.env)

Vue.use(VueRouter)

const routes = [
    {
        name: 'App',
        path: '/',
        component: HomePage,
        children: [
            {
                name: 'MultipleSelect',
                path: 'MultipleSelect',
                component: MultipleSelectPage,
                children: [
                    {
                        name: 'MultipleSelectMain',
                        path: '',
                        component: MultipleSelectMain
                    }
                ]
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
export default router