/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('./components/Dashboard.vue'),
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./components/Dashboard.vue'),
        },
        {
            path: '/companies',
            name: 'companies',
            component: () => import('./components/company/Companies.vue'),
        },
        {
            path: '/company/:id/edit',
            name: 'company-edit',
            component: () => import('./components/company/CompanyEdit.vue'),
        },
        {
            path: '/employees',
            name: 'employees',
            component: () => import('./components/employee/Employees.vue'),
        },
        {
            path: '/employee/:id/edit',
            name: 'employee-edit',
            component: () => import('./components/employee/EmployeeEdit.vue'),
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
});

// router.afterEach(() => {
//     // Remove initial loading
//     const appLoading = document.getElementById('loading-bg')
//     if (appLoading) {
//         appLoading.style.display = "none";
//     }
// })

export default router;
