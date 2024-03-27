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

export const VehicleAccessCreateView = {
  path: '/accreditations/vehicle-access',
  name: 'vehicle-access-create',
  component: () => import('../views/vehicles/VehicleAccessCreateView.vue'),
}

export const VehicleAccessDetailView = {
  path: '/accreditations/vehicle-access/:id',
  name: 'vehicle-access-detail',
  component: () => import('../views/vehicles/VehicleAccessDetailView.vue'),
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

export const AircraftEditView = {
  path: '/accreditations/non-commercial-aircraft/:id/edit',
  name: 'non-commercial-aircraft-edit',
  component: () => import('../views/aircrafts/AircraftEditView.vue'),
}

export const CommunicationEquipmentCreateView = {
  path: '/accreditations/communication-equipment',
  name: 'communication-equipment-create',
  component: () => import('../views/communications/CommunicationEquipmentCreateView.vue'),
}

export const CommunicationEquipmentDetailView = {
  path: '/accreditations/communication-equipment/:id',
  name: 'communication-equipment-detail',
  component: () => import('../views/communications/CommunicationEquipmentDetailView.vue'),
}

export const SecurityWeaponCreateView = {
  path: '/accreditations/security-weapons',
  name: 'security-weapon-create',
  component: () => import('../views/weapons/WeaponCreateView.vue'),
}

export const SecurityDetailView = {
  path: '/accreditations/security-weapons/:id',
  name: 'security-detail',
  component: () => import('../views/weapons/SecurityDetailView.vue'),
}

export const SecurityEditView = {
  path: '/accreditations/security-weapons/:id/edit',
  name: 'security-edit',
  component: () => import('../views/weapons/SecurityEditView.vue'),
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeView,
    LoginView,
    AccreditationListView,
    NationalAccreditationCreateView,
    NationalAccreditationDetailView,
    NationalAccreditationEditView,
    InternationalAccreditationCreateView,
    InternationalAccreditationDetailView,
    InternationalAccreditationEditView,
    VehicleAccessCreateView,
    VehicleAccessDetailView,
    GeneralVehicleCreateView,
    GeneralVehicleDetailView,
    NonCommercialAircraftCreateView,
    AircraftDetailView,
    AircraftEditView,
    CommunicationEquipmentCreateView,
    CommunicationEquipmentDetailView,
    SecurityWeaponCreateView,
    SecurityDetailView,
    SecurityEditView,
    UserListView,
    UserCreateView,
  ],
})

router.beforeEach(async (to, before, next) => {
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
