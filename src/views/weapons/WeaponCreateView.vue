<script lang="ts" setup>
import WeaponForm from '@/components/weapons/WeaponForm.vue'
import SecurityDisclaimer from '@/components/weapons/SecurityDisclaimer.vue'
</script>

<template>
  <header class="flex flex-col text-center text-2xl font-bold">
    <span>República de Panamá</span>
    <span>Transmisión de Mando Presidencial 2024</span>
    <span>Acreditación de Armas</span>
  </header>

  <main class="mt-10">
    <SecurityDisclaimer />
    <WeaponForm />
  </main>
</template>
x
