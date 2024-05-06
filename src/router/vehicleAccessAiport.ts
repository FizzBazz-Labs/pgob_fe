export const VehicleAccessListView = {
  path: '/accreditations/vehicle-access',
  name: 'vehicle-access-list',
  component: () => import('../views/vehicles/VehicleAccessListView.vue'),
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

export const VehicleAccessRoutes = [
  VehicleAccessListView,
  VehicleAccessCreateView,
  VehicleAccessDetailView,
]
