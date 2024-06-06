export const UserListView = {
  path: '/users',
  name: 'user-list',
  component: () => import('../views/users/UserListView.vue'),
}

export const UserCreateView = {
  path: '/users/add',
  name: 'user-create',
  component: () => import('../views/users/UserCreateView.vue'),
}

export const UserDetailView = {
  path: '/users/:id',
  name: 'user-detail',
  component: () => import('../views/users/UserDetailView.vue'),
}

export const UserEditView = {
  path: '/users/:id/edit',
  name: 'user-edit',
  component: () => import('../views/users/UserEditView.vue'),
}

export const UserRoutes = [UserListView, UserCreateView, UserDetailView, UserEditView]
