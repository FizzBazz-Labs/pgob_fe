export const CommunicationEquipmentList = {
  path: '/accreditations/communication-equipments',
  name: 'communication-equipment-list',
  meta: { permissions: 'CommunicationEquipment' },
  component: () => import('../views/communications/CommunicationEquipmentListView.vue'),
}

export const CommunicationEquipmentCreateView = {
  path: '/accreditations/communication-equipments/add',
  name: 'communication-equipment-create',
  meta: { permissions: 'CommunicationEquipment' },
  component: () => import('../views/communications/CommunicationEquipmentCreateView.vue'),
}

export const CommunicationEquipmentDetailView = {
  path: '/accreditations/communication-equipment/:id',
  name: 'communication-equipment-detail',
  meta: { permissions: 'CommunicationEquipment' },
  component: () => import('../views/communications/CommunicationEquipmentDetailView.vue'),
}

export const CommunicationEquipmentEditView = {
  path: '/accreditations/communication-equipment/:id/edit',
  name: 'communication-equipment-edit',
  meta: { permissions: 'CommunicationEquipment' },
  component: () => import('../views/communications/CommunicationEquipmentEditView.vue'),
}

export const CommunicationEquipmentRoutes = [
  CommunicationEquipmentList,
  CommunicationEquipmentCreateView,
  CommunicationEquipmentDetailView,
  CommunicationEquipmentEditView,
]
