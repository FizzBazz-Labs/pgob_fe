export const CommerceListView = {
  path: '/accreditations/commerces',
  name: 'commerce-list',
  meta: { permissions: 'Commerce' },
  component: () => import('../views/commerce/CommerceListView.vue'),
}

export const CommerceCreateView = {
  path: '/accreditations/commerces/add',
  name: 'commerce-create',
  meta: { permissions: 'Commerce' },
  component: () => import('../views/commerce/CommerceCreateView.vue'),
}

export const CommerceDetailView = {
  path: '/accreditations/commerces/:id',
  name: 'commerce-detail',
  meta: { permissions: 'Commerce' },
  component: () => import('../views/commerce/CommerceDetailView.vue'),
}

export const CommerceEditView = {
  path: '/accreditations/commerces/:id/edit',
  name: 'commerce-edit',
  meta: { permissions: 'Commerce' },
  component: () => import('../views/commerce/CommerceEditView.vue'),
}

export const CommerceRoutes = [
  CommerceListView,
  CommerceCreateView,
  CommerceDetailView,
  CommerceEditView,
]
