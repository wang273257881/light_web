import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '项目首页'
                },
                component: () => import (
                /* webpackChunkName: "dashboard" */
                "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '项目部署 · 用户'
                },
                component: () => import (
                /* webpackChunkName: "table" */
                "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '源代码'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '前言'
                },
                component: () => import (
                /* webpackChunkName: "form" */
                "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '云函数创建'
                },
                component: () => import (
                /* webpackChunkName: "tabs" */
                "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '云存储设置'
                },
                component: () => import (
                /* webpackChunkName: "donate" */
                "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '运行效果',
                    permission: true
                },
                component: () => import (
                /* webpackChunkName: "permission" */
                "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '准备工作'
                },
                component: () => import (
                /* webpackChunkName: "i18n" */
                "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '数据库初始化'
                },
                component: () => import (
                /* webpackChunkName: "upload" */
                "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '项目参数设置'
                },
                component: () => import (
                /* webpackChunkName: "icon" */
                "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: 'IM设置'
                },
                component: () => import (/* webpackChunkName: "404" */
                '../views/404.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router;