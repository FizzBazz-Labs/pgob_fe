export const NationalListView = {
  path: '/nationals',
  name: 'national-list',
  meta: { permissions: 'National' },
  component: () => import('../views/nationals/NationalListView.vue'),
}

export const NationalAccreditationCreateView = {
  path: '/accreditations/nationals/create',
  name: 'national-create',
  meta: { permissions: 'National' },
  component: () => import('../views/nationals/NationalCreateView.vue'),
}

export const NationalAccreditationDetailView = {
  path: '/accreditations/nationals/:id',
  name: 'national-detail',
  meta: { requiresAuth: false, permissions: 'National' },
  component: () => import('../views/nationals/NationalDetailView.vue'),
}

export const NationalAccreditationEditView = {
  path: '/accreditations/nationals/:id/edit',
  name: 'national-accreditation-edit',
  meta: { permissions: 'National' },
  component: () => import('../views/nationals/NationalEditView.vue'),
}

export const NationalRoutes = [
  NationalListView,
  NationalAccreditationCreateView,
  NationalAccreditationDetailView,
  NationalAccreditationEditView,
]
