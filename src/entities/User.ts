export interface User {
  id: 0
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  group: Group
  country: string
  passportId: string
}

export enum Group {
  ADMIN = 'Admin',
  Accreditor = 'Accreditor',
  Reviewer = 'Reviewer',
  USER = 'User',
}
