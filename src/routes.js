import Login from './Login.svelte'
import Layout from './Layout.svelte'
import Splash from './Splash.svelte'
import Page from './Page.svelte'
import Parties from './Parties.svelte'
import Characters from './Characters.svelte'
import Sheet from './sheets/Sheet.svelte'


function userIsAdmin() {
  //check if user is admin and returns true or false
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
        layout: Layout 
    },
    { 
        name: 'characters', 
        component: Characters, 
        layout: Layout 
    },
    { 
        name: 'parties', 
        component: Parties, 
        layout: Layout 
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