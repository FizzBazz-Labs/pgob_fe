export const GeneralVehicleListView = {
  path: '/accreditations/general-vehicles',
  name: 'general-vehicles-list',
  meta: { permissions: 'GeneralVehicle' },
  component: () => import('../views/vehicles/general/GeneralVehicleListView.vue'),
}

export const GeneralVehicleCreateView = {
  path: '/accreditations/general-vehicles/add',
  name: 'general-vehicle-create',
  meta: { permissions: 'GeneralVehicle' },
  component: () => import('../views/vehicles/general/GeneralVehicleCreateView.vue'),
}

export const GeneralVehicleDetailView = {
  path: '/accreditations/general-vehicles/:id',
  name: 'general-vehicle-detail',
  meta: { permissions: 'GeneralVehicle' },
  component: () => import('../views/vehicles/general/GeneralVehicleDetailView.vue'),
}

export const GeneralVehiclesRoutes = [
  GeneralVehicleListView,
  GeneralVehicleCreateView,
  GeneralVehicleDetailView,
]
