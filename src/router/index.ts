import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

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

export const GeneralVehicleCreateView = {
  path: '/accreditations/general-vehicle',
  name: 'general-vehicle-create',
  component: () => import('../views/vehicles/GeneralVehicleCreateView.vue'),
}

export const GeneralVehicleDetailView = {
  path: '/accreditations/general-vehicle/:id',
  name: 'general-vehicles-detail',
  component: () => import('../views/vehicles/GeneralVehicleDetailView.vue'),
}

export const NonCommercialAircraftCreateView = {
  path: '/accreditations/non-commercial-aircraft',
  name: 'non-commercial-aircraft-create',
  component: () => import('../views/aircrafts/NonCommercialAircraftCreateView.vue'),
}

export const AircraftDetailView = {
  path: '/accreditations/non-commercial-aircraft/:id',
  name: 'non-commercial-aircraft-detail',
  component: () => import('../views/aircrafts/AircraftDetailView.vue'),
}

export const CommunicationEquipmentCreateView = {
  path: '/accreditations/communication-equipment',
  name: 'communication-equipment-create',
  component: () => import('../views/communications/CommunicationEquipmentCreateView.vue'),
}

export const SecurityWeaponCreateView = {
  path: '/accreditations/security-weapons',
  name: 'security-weapon-create',
  component: () => import('../views/weapons/WeaponCreateView.vue'),
}

export const HomeView = {
  path: '/',
  name: 'home',
  redirect: AccreditationListView.path,
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
    GeneralVehicleCreateView,
    GeneralVehicleDetailView,
    NonCommercialAircraftCreateView,
    AircraftDetailView,
    CommunicationEquipmentCreateView,
    SecurityWeaponCreateView,
  ],
})

router.beforeEach(to => {
  const store = useAuthStore()

  const isLogin = to.name === LoginView.name
  const isLogged = Boolean(store.token)

  if (!isLogin && !isLogged) return LoginView
})

export default router
