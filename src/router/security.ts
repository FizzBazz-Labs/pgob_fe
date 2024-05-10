export const SecurityListView = {
  path: '/accreditations/security-weapons',
  name: 'security-list',
  meta: { permissions: 'Security' },
  component: () => import('../views/weapons/SecurityListView.vue'),
}

export const SecurityWeaponCreateView = {
  path: '/accreditations/security-weapons',
  name: 'security-weapon-create',
  meta: { permissions: 'Security' },
  component: () => import('../views/weapons/WeaponCreateView.vue'),
}

export const SecurityDetailView = {
  path: '/accreditations/security-weapons/:id',
  name: 'security-detail',
  meta: { permissions: 'Security' },
  component: () => import('../views/weapons/SecurityDetailView.vue'),
}

export const SecurityEditView = {
  path: '/accreditations/security-weapons/:id/edit',
  name: 'security-edit',
  meta: { permissions: 'Security' },
  component: () => import('../views/weapons/SecurityEditView.vue'),
}

export const SecurityRoutes = [
  SecurityListView,
  SecurityWeaponCreateView,
  SecurityDetailView,
  SecurityEditView,
]
