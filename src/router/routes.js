const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/resetSenha',
    name: 'ResetSenha',
    component: () => import('pages/resetSenha.vue')
  },

  // {
  //   path: "",
  //   name: "",
  //   component: () => import("layouts/Blank.vue"),
  //   redirect: "",
  //   children: [
  //     ,
  //   ],
  // },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'Home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('pages/Home.vue')
      },

      {
        path: 'leads',
        name: 'Leads',
        component: () => import('pages/leads/index.vue')
      },

      {
        path: 'responder',
        name: 'Responder',
        component: () => import('pages/leads/responder.vue')
      },

      {
        path: 'configuracoes',
        name: 'Configuracoes',
        component: () => import('pages/configuracoes.vue')
      },

      {
        path: 'widget',
        name: 'Widget',
        component: () => import('pages/Widgets.vue')
      },
      {
        path: 'widget/:id',
        component: () => import('pages/Widget.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
