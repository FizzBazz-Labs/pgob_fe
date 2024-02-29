<script lang="ts" setup>
// import { ref } from 'vue'
</script>

<template>
  <main class="container mx-auto">
    <FormKit type="form">
      <div>
        <span class="divider text-xl font-bold"> Datos Personales </span>

        <div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormKit
            type="text"
            name="name"
            id="name"
            label="Nombre"
            validation="required|not:Admin"
          />

          <FormKit
            type="text"
            name="name"
            id="name"
            label="Nombre"
            validation="required|not:Admin"
          />

          <FormKit
            type="text"
            name="name"
            id="name"
            label="Nombre"
            validation="required|not:Admin"
          />
        </div>
      </div>
    </FormKit>
  </main>
</template>
