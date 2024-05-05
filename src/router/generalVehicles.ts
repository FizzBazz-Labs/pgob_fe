export const GeneralVehicleListView = {
  path: '/accreditations/general-vehicles',
  name: 'general-vehicles-list',
  component: () => import('../views/vehicles/GeneralVehicleListView.vue'),
}

export const GeneralVehicleCreateView = {
  path: '/accreditations/general-vehicles/add',
  name: 'general-vehicle-create',
  component: () => import('../views/vehicles/GeneralVehicleCreateView.vue'),
}

export const GeneralVehicleDetailView = {
  path: '/accreditations/general-vehicles/:id',
  name: 'general-vehicles-detail',
  component: () => import('../views/vehicles/GeneralVehicleDetailView.vue'),
}

export const GeneralVehiclesRoutes = [
  GeneralVehicleListView,
  GeneralVehicleCreateView,
  GeneralVehicleDetailView,
]
