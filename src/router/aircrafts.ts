export const OverflightNonCommercialAircraftListView = {
  path: '/accreditations/non-commercial-aircrafts',
  name: 'non-commercial-aircraft-list',
  permission: 'Aircraft',
  component: () => import('../views/aircrafts/AircraftListView.vue'),
}

export const NonCommercialAircraftCreateView = {
  path: '/accreditations/non-commercial-aircrafts/add',
  name: 'non-commercial-aircraft-create',
  permission: 'Aircraft',
  component: () => import('../views/aircrafts/NonCommercialAircraftCreateView.vue'),
}

export const AircraftDetailView = {
  path: '/accreditations/non-commercial-aircrafts/:id',
  name: 'non-commercial-aircraft-detail',
  permission: 'Aircraft',
  component: () => import('../views/aircrafts/AircraftDetailView.vue'),
}

export const AircraftEditView = {
  path: '/accreditations/non-commercial-aircrafts/:id/edit',
  name: 'non-commercial-aircraft-edit',
  permission: 'Aircraft',
  component: () => import('../views/aircrafts/AircraftEditView.vue'),
}

export const OverflightNonCommercialAircraftsRoutes = [
  OverflightNonCommercialAircraftListView,
  NonCommercialAircraftCreateView,
  AircraftDetailView,
  AircraftEditView,
]
