export const CommunicationEquipmentList = {
  path: '/accreditations/communication-equipments',
  name: 'communication-equipment-list',
  component: () => import('../views/communications/CommunicationEquipmentListView.vue'),
}

export const CommunicationEquipmentCreateView = {
  path: '/accreditations/communication-equipments/add',
  name: 'communication-equipment-create',
  component: () => import('../views/communications/CommunicationEquipmentCreateView.vue'),
}

export const CommunicationEquipmentDetailView = {
  path: '/accreditations/communication-equipment/:id',
  name: 'communication-equipment-detail',
  component: () => import('../views/communications/CommunicationEquipmentDetailView.vue'),
}

export const CommunicationEquipmentEditView = {
  path: '/accreditations/communication-equipment/:id/edit',
  name: 'communication-equipment-edit',
  component: () => import('../views/communications/CommunicationEquipmentEditView.vue'),
}

export const CommunicationEquipmentRoutes = [
  CommunicationEquipmentList,
  CommunicationEquipmentCreateView,
  CommunicationEquipmentDetailView,
  CommunicationEquipmentEditView,
]
