export const VehicleAccessListView = {
  path: '/accreditations/vehicle-access',
  name: 'vehicle-access-list',
  meta: { permissions: 'VehicleAccessAirport' },
  component: () => import('../views/vehicles/VehicleAccessListView.vue'),
}

export const VehicleAccessCreateView = {
  path: '/accreditations/vehicle-access',
  name: 'vehicle-access-create',
  meta: { permissions: 'VehicleAccessAirport' },
  component: () => import('../views/vehicles/VehicleAccessCreateView.vue'),
}

export const VehicleAccessDetailView = {
  path: '/accreditations/vehicle-access/:id',
  name: 'vehicle-access-detail',
  meta: { permissions: 'VehicleAccessAirport' },
  component: () => import('../views/vehicles/VehicleAccessDetailView.vue'),
}

export const VehicleAccessEditView = {
  path: '/accreditations/vehicle-access/:id/edit',
  name: 'vehicle-access-edit',
  meta: { permissions: 'VehicleAccessAirport' },
  component: () => import('../views/vehicles/access/VehicleAccessEditView.vue'),
}

export const VehicleAccessRoutes = [
  VehicleAccessListView,
  VehicleAccessCreateView,
  VehicleAccessDetailView,
  VehicleAccessEditView,
]
