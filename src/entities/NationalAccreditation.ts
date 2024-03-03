export interface NationalAccreditation {
  id: number
  image: string
  firstName: string
  lastName: string
  passportId: string
  position: string
  subPosition?: string
  mediaChannel?: string
  authorizationLetter?: string
  institution: string
  address: string
  phoneNumber: string
  phoneNumber2?: string
  email: string
  birthday: string
  birthplace: string
  bloodType: string
  type: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export enum NationalAccreditationType {
  generalCoordination = 'General Coordination',
  protocol = 'Protocol',
  security = 'Security',
  technicalStaff = 'Technical Staff',
  officialDelegation = 'Official Delegation',
  link = 'Link',
  supplier = 'Supplier',
  newsletterCommittee = 'Newsletter Committee',
  commercialNewsletter = 'Commercial Newsletter',
}
