export const HousingListView = {
  path: '/accreditations/housings',
  name: 'housing-list',
  meta: { permissions: 'Housing' },
  component: () => import('../views/housing/HousingListView.vue'),
}

export const HousingCreateView = {
  path: '/accreditations/housings/add',
  name: 'housing-create',
  meta: { permissions: 'Housing' },
  component: () => import('../views/housing/HousingCreateView.vue'),
}

export const HousingDetailView = {
  path: '/accreditations/housings/:id',
  name: 'housing-detail',
  meta: { permissions: 'Housing' },
  component: () => import('../views/housing/HousingDetailView.vue'),
}

export const HousingEditView = {
  path: '/accreditations/housings/:id/edit',
  name: 'housing-edit',
  meta: { permissions: 'Housing' },
  component: () => import('../views/housing/HousingEditView.vue'),
}

export const HousingRoutes = [
  HousingListView,
  HousingCreateView,
  HousingDetailView,
  HousingEditView,
]
