import Login from './Login.svelte'
import Layout from './Layout.svelte'
import Splash from './Splash.svelte'
import Page from './Page.svelte'
import Parties from './Parties.svelte'
import Characters from './Characters.svelte'
import Sheet from './sheets/Sheet.svelte'

import { userStore } from './stores.js'


let isSignedIn_value = false

const unsubscribe = userStore.subscribe(value => {
  isSignedIn_value = value.isSignedIn
})

function userIsSignedIn() {
  console.log('router :: userIsSignedIn?', isSignedIn_value)
  return isSignedIn_value
}

const routes = [
    {
        name: '/',
        component: Splash, 
        layout: Layout,
    },
    { 
        name: 'login', 
        component: Login, 
        layout: Layout 
    },
    { 
        name: 'sheet', 
        component: Sheet, 
        layout: Layout,
        onlyIf: { guard: userIsSignedIn, redirect: '/login' }, 
    },
    { 
        name: 'characters', 
        component: Characters, 
        layout: Layout,
        onlyIf: { guard: userIsSignedIn, redirect: '/login' }
    },
    {
      name: 'characters/:id',
      component: Sheet,
      layout: Layout,
      onlyIf: { guard: userIsSignedIn, redirect: '/login' }
    },
    { 
        name: 'parties', 
        component: Parties, 
        layout: Layout,
        onlyIf: { guard: userIsSignedIn, redirect: '/login' },
    },
    { 
        name: '404.html', 
        component: Page, 
        layout: Layout 
    },

  /*{
    name: 'admin',
    component: AdminLayout,
    onlyIf: { guard: userIsAdmin, redirect: '/login' },
    nestedRoutes: [
      { name: 'index', component: AdminIndex },
      {
        name: 'employees',
        component: '',
        nestedRoutes: [
          { name: 'index', component: EmployeesIndex },
          { name: 'show/:id', component: EmployeesShow },
        ],
      },
    ],
  },*/
]

export { routes }