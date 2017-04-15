import App from '../containers/App/app'
import Home from '../routes/Home'
import About from '../routes/About'
import PageOne from '../routes/PageOne'
import NotFound from '../routes/NotFound'

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/pageOne',
        component: PageOne
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes

// function errorLoading (err) {
//   console.error('Dynamic page loading failed', err)
// }
//
// function loadRoute (cb) {
//   return (module) => cb(null, module.default)
// }
//
// export default {
//   component: App,
//   childRoutes: [
//     {
//       path: '/',
//       getComponent (location, cb) {
//         System.import('./Home')
//           .then(loadRoute(cb))
//           .catch(errorLoading)
//       }
//     },
//     {
//       path: 'about',
//       getComponent (location, cb) {
//         System.import('./About')
//           .then(loadRoute(cb))
//           .catch(errorLoading)
//       }
//     },
//     {
//       path: 'pageOne',
//       getComponent (location, cb) {
//         System.import('./PageOne')
//           .then(loadRoute(cb))
//           .catch(errorLoading)
//       }
//     },
//     {
//       path: '*',
//       getComponent (location, cb) {
//         System.import('./NotFound')
//           .then(loadRoute(cb))
//           .catch(errorLoading)
//       }
//     }
//   ]
// }
