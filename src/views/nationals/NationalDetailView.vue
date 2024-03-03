<script lang="ts" setup>
import { ref } from 'vue'

import type { NationalAccreditation } from '@/entities/NationalAccreditation'

const item = ref<NationalAccreditation>({
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  passportId: '123456789',
  position: 'Developer',
  subPosition: 'Frontend',
  mediaChannel: 'Facebook',
  authorizationLetter: 'https://example.com/authorization-letter',
  institution: 'Instituto Nacional de Cultura',
  address: 'Panamá',
  phoneNumber: '123456789',
  phoneNumber2: '987654321',
  email: 'example@gmail.com',
  birthday: '1990-01-01',
  birthplace: 'Panamá',
  bloodType: 'O+',
  type: 'national',
  createdBy: 'John Doe',
  createdAt: '2021-01-01T00:00:00Z',
  updatedAt: '2021-01-01T00:00:00Z',
  image: 'https://example.com/image.jpg',
})
</script>

<template>
  <main class="container mx-auto">National Accreditation Detail</main>
</template>
