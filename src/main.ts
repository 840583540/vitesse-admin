// import { ViteSSG } from 'vite-ssg'
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import generatedRoutes from '~pages'

// import '@unocss/reset/tailwind.css'
import './styles/tailwind.reset.css'
import 'uno.css'
import './styles/main.css'
import 'element-plus/es/components/message-box/style/css'

const app = createApp(App)
const head = createHead()

app.use(head)

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app }))
app.mount('#app')

// https://github.com/antfu/vite-ssg
// export const createApp = ViteSSG(
//   App,
//   { routes, base: import.meta.env.BASE_URL },
//   (ctx) => {
//     // install all modules under `modules/`
//     Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
//   },
// )
