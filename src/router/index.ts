import { createRouter, createWebHistory } from 'vue-router'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import { AccreditationRoutes } from '@/router/accreditations'
import { CommerceRoutes } from '@/router/commerce'
import { HousingRoutes } from '@/router/housing'
import { GeneralVehiclesRoutes } from '@/router/generalVehicles'
import { CommunicationEquipmentRoutes } from '@/router/communicationEquipments'
import { OverflightNonCommercialAircraftsRoutes } from '@/router/aircrafts'
import { VehicleAccessRoutes } from '@/router/vehicleAccessAiport'
import { SecurityRoutes } from '@/router/security'

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

export const NationalAccreditationCreateView = {
  path: '/accreditations/nationals/create',
  name: 'national-accreditation-create',
  component: () => import('../views/nationals/NationalCreateView.vue'),
}

export const NationalAccreditationDetailView = {
  path: '/accreditations/nationals/:id',
  name: 'national-accreditation-detail',
  meta: { requiresAuth: false },
  component: () => import('../views/nationals/NationalDetailView.vue'),
}

export const NationalAccreditationEditView = {
  path: '/accreditations/nationals/:id/edit',
  name: 'national-accreditation-edit',
  component: () => import('../views/nationals/NationalEditView.vue'),
}

export const InternationalAccreditationCreateView = {
  path: '/accreditations/internationals',
  name: 'international-accreditation-create',
  component: () => import('../views/internationals/InternationalCreateView.vue'),
}

export const InternationalAccreditationDetailView = {
  path: '/accreditations/internationals/:id',
  name: 'international-accreditation-detail',
  meta: { requiresAuth: false },
  component: () => import('../views/internationals/InternationalDetailView.vue'),
}

export const InternationalAccreditationEditView = {
  path: '/accreditations/internationals/:id/edit',
  name: 'international-accreditation-edit',
  component: () => import('../views/internationals/InternationalEditView.vue'),
}

export const HomeView = {
  path: '/',
  name: 'home',
  redirect: AccreditationListView.path,
}

export const UserListView = {
  path: '/users',
  name: 'user-list',
  component: () => import('../views/users/UserListView.vue'),
}

export const UserCreateView = {
  path: '/users/add',
  name: 'user-create',
  component: () => import('../views/users/UserCreateView.vue'),
}

export const UserDetailView = {
  path: '/users/:id',
  name: 'user-detail',
  component: () => import('../views/users/UserDetailView.vue'),
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeView,
    LoginView,
    AccreditationListView,
    NationalAccreditationTableView,
    NationalAccreditationCreateView,
    NationalAccreditationDetailView,
    NationalAccreditationEditView,
    InternationalAccreditationCreateView,
    InternationalAccreditationDetailView,
    InternationalAccreditationEditView,

    UserListView,
    UserCreateView,
    UserDetailView,
    DashboardView,
    UnavailableSiteView,
    SiteConfigurationEditView,
    ProfileView,

    ...AccreditationRoutes,
    ...CommerceRoutes,
    ...HousingRoutes,
    ...GeneralVehiclesRoutes,
    ...CommunicationEquipmentRoutes,
    ...OverflightNonCommercialAircraftsRoutes,
    ...VehicleAccessRoutes,
    ...SecurityRoutes,
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

  if (!isLogin && !isLogged) return next(LoginView)

  return next()
})

export default router
