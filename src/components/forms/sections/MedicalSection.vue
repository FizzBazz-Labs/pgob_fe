<script lang="ts" setup>
import AllergiesField from '../fields/AllergiesField.vue'
import BloodField from '../fields/BloodField.vue'
import DiseasesField from '../fields/DiseasesField.vue'
import ImmunizationsField from '../fields/ImmunizationsField.vue'
import MedicalHistoryField from '../fields/MedicalHistoryField.vue'
import MedicalStaffField from '../fields/MedicalStaffField.vue'
import MedicationField from '../fields/MedicationField.vue'
import SurgicalField from '../fields/SurgicalField.vue'

const labels = {
  contact: 'Datos de Contacto',
}
</script>

<template>
  <h2 class="divider divider-start mt-10 text-xl font-bold">
    {{ labels.contact }}
  </h2>

  <BloodField />
  <DiseasesField />
  <MedicationField />
  <AllergiesField />
  <ImmunizationsField />
  <MedicalHistoryField />
  <SurgicalField />
  <MedicalStaffField />
</template>
