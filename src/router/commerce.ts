export const CommerceListView = {
  path: '/accreditations/commerces',
  name: 'commerce-list',
  component: () => import('../views/commerce/CommerceListView.vue'),
}

export const CommerceCreateView = {
  path: '/accreditations/commerces/add',
  name: 'commerce-create',
  component: () => import('../views/commerce/CommerceCreateView.vue'),
}

export const CommerceDetailView = {
  path: '/accreditations/commerces/:id',
  name: 'commerce-detail',
  component: () => import('../views/commerce/CommerceDetailView.vue'),
}

export const CommerceEditView = {
  path: '/accreditations/commerces/:id/edit',
  name: 'commerce-edit',
  component: () => import('../views/commerce/CommerceEditView.vue'),
}

export const CommerceRoutes = [
  CommerceListView,
  CommerceCreateView,
  CommerceDetailView,
  CommerceEditView,
]
