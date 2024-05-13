export const InternationalListView = {
  path: '/accreditations/internationals',
  name: 'international-list',
  meta: { permissions: 'International' },
  component: () => import('../views/internationals/InternationalListView.vue'),
}

export const InternationalAccreditationCreateView = {
  path: '/accreditations/internationals/add',
  name: 'international-create',
  meta: { permissions: 'National' },
  component: () => import('../views/internationals/InternationalCreateView.vue'),
}

export const InternationalAccreditationDetailView = {
  path: '/accreditations/internationals/:id',
  name: 'international-detail',
  meta: { requiresAuth: false, permissions: 'International' },
  component: () => import('../views/internationals/InternationalDetailView.vue'),
}

export const InternationalAccreditationEditView = {
  path: '/accreditations/internationals/:id/edit',
  name: 'international-edit',
  meta: { permissions: 'International' },
  component: () => import('../views/internationals/InternationalEditView.vue'),
}

export const InternationalRoutes = [
  InternationalListView,
  InternationalAccreditationCreateView,
  InternationalAccreditationDetailView,
  InternationalAccreditationEditView,
]
