import { createRouter, createWebHistory } from 'vue-router'

export const HomeView = {
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue'),
}

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

export const NationalAccreditationCreateView = {
  path: '/accreditations/nationals',
  name: 'national-accreditation-create',
  component: () => import('../views/nationals/NationalCreateView.vue'),
}

export const NationalAccreditationDetailView = {
  path: '/accreditations/nationals/:id',
  name: 'national-accreditation-detail',
  component: () => import('../views/nationals/NationalDetailView.vue'),
}

export const InternationalAccreditationCreateView = {
  path: '/accreditations/internationals',
  name: 'international-accreditation-create',
  component: () => import('../views/internationals/InternationalCreateView.vue'),
}

export const InternationalAccreditationDetailView = {
  path: '/accreditations/internationals/:id',
  name: 'international-accreditation-detail',
  component: () => import('../views/internationals/InternationalDetailView.vue'),
}

export const VehicleAccessCreateView = {
  path: '/accreditations/vehicle-access',
  name: 'vehicle-access-create',
  component: () => import('../views/vehicles/VehicleAccessCreateView.vue'),
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeView,
    LoginView,
    AccreditationListView,
    NationalAccreditationCreateView,
    NationalAccreditationDetailView,
    InternationalAccreditationCreateView,
    InternationalAccreditationDetailView,
    VehicleAccessCreateView,
  ],
})

export default router
