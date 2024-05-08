export const InternationalListView = {
  path: '/accreditations/internationals',
  name: 'international-list',
  component: () => import('../views/internationals/InternationalListView.vue'),
}

export const InternationalAccreditationCreateView = {
  path: '/accreditations/internationals/add',
  name: 'international-create',
  component: () => import('../views/internationals/InternationalCreateView.vue'),
}

export const InternationalAccreditationDetailView = {
  path: '/accreditations/internationals/:id',
  name: 'international-detail',
  meta: { requiresAuth: false },
  component: () => import('../views/internationals/InternationalDetailView.vue'),
}

export const InternationalAccreditationEditView = {
  path: '/accreditations/internationals/:id/edit',
  name: 'international-edit',
  component: () => import('../views/internationals/InternationalEditView.vue'),
}

export const InternationalRoutes = [
  InternationalListView,
  InternationalAccreditationCreateView,
  InternationalAccreditationDetailView,
  InternationalAccreditationEditView,
]
