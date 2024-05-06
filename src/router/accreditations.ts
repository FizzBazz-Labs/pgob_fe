export const AccreditationGenerateView = {
  path: '/accreditations/certificate',
  name: 'accreditation-certificate',
  component: () => import('../views/AccreditationCertificateView.vue'),
}

export const AccreditationRoutes = [AccreditationGenerateView]
