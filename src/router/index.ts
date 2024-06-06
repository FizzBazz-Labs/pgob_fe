import { createRouter, createWebHistory } from 'vue-router'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { AccreditationRoutes } from '@/router/accreditations'
import { CommerceRoutes } from '@/router/commerce'
import { HousingRoutes } from '@/router/housing'
import { GeneralVehiclesRoutes } from '@/router/generalVehicles'
import { CommunicationEquipmentRoutes } from '@/router/communicationEquipments'
import { OverflightNonCommercialAircraftsRoutes } from '@/router/aircrafts'
import { VehicleAccessRoutes } from '@/router/vehicleAccessAiport'
import { SecurityRoutes } from '@/router/security'
import { InternationalRoutes } from './internationals'
import { NationalRoutes } from './nationals'
import { UserRoutes } from './users'

export const LoginView = {
  path: '/login',
  name: 'login',
  component: () => import('../views/LoginView.vue'),
}

export const AccreditationListView = {
  path: '/accreditations',
  name: 'accreditations',
  component: () => import('../views/AccreditationListView.vue'),
}

export const NationalAccreditationTableView = {
  path: '/accreditations/nationals',
  name: 'national-accreditation-table',
  component: () => import('../components/accreditations/AccreditationTable.vue'),
}

export const HomeView = {
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue'),
}

export const DashboardView = {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('../views/DashboardView.vue'),
}

export const UnavailableSiteView = {
  path: '/unavailable',
  name: 'unavailable',
  meta: { requiresAuth: false },
  component: () => import('../views/UnavailableSiteView.vue'),
}

export const SiteConfigurationEditView = {
  path: '/config',
  name: 'site-configuration-edit',
  component: () => import('../views/site/SiteConfigurationEditView.vue'),
}

export const ProfileView = {
  path: '/profile',
  name: 'profile',
  component: () => import('../views/ProfileView.vue'),
}

export const Accreditation404View = {
  path: '/404',
  name: 'accreditation-404',
  component: () => import('../views/Accreditation404View.vue'),
  meta: { requiresAuth: false },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeView,
    LoginView,
    AccreditationListView,
    NationalAccreditationTableView,

    Accreditation404View,
    DashboardView,
    UnavailableSiteView,
    SiteConfigurationEditView,
    ProfileView,

    ...UserRoutes,
    ...AccreditationRoutes,
    ...CommerceRoutes,
    ...HousingRoutes,
    ...GeneralVehiclesRoutes,
    ...CommunicationEquipmentRoutes,
    ...OverflightNonCommercialAircraftsRoutes,
    ...VehicleAccessRoutes,
    ...SecurityRoutes,
    ...InternationalRoutes,
    ...NationalRoutes,
  ],
})

router.beforeEach(async (to, before, next) => {
  const config = useConfigStore()
  await config.fetchConfig()

  document.title = config.name

  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link')
  favicon.setAttribute('rel', 'icon')
  favicon.setAttribute('href', config.favicon)

  document.getElementsByTagName('head')[0].appendChild(favicon)

  if (!config.available && to.name !== UnavailableSiteView.name) {
    return next(UnavailableSiteView)
  }

  if (config.available && to.name === UnavailableSiteView.name) {
    return next(HomeView)
  }

  const auth = useAuthStore()
  if (!auth.token) await auth.init()

  if ('requiresAuth' in to.meta && to.meta.requiresAuth === false) {
    return next()
  }

  const isLogin = to.name === LoginView.name
  const isLogged = Boolean(auth.token)

  if ('permissions' in to.meta) {
    const hasPermission = auth.user.accreditations.some(item => item.name == to.meta.permissions)
    if (!hasPermission) {
      return next(HomeView)
    }
  }

  if (!isLogin && !isLogged) return next(LoginView)

  const general = useGeneralStore()
  await general.fetchHelp()

  return next()
})

export default router
