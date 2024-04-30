export const HousingListView = {
  path: '/accreditations/housings',
  name: 'housing-list',
  component: () => import('../views/housing/HousingListView.vue'),
}

export const HousingCreateView = {
  path: '/accreditations/housings/add',
  name: 'housing-create',
  component: () => import('../views/housing/HousingCreateView.vue'),
}

export const HousingDetailView = {
  path: '/accreditations/housings/:id',
  name: 'housing-detail',
  component: () => import('../views/housing/HousingDetailView.vue'),
}

export const HousingEditView = {
  path: '/accreditations/housings/:id/edit',
  name: 'housing-edit',
  component: () => import('../views/housing/HousingEditView.vue'),
}

export const HousingRoutes = [
  HousingListView,
  HousingCreateView,
  HousingDetailView,
  HousingEditView,
]
