<script lang="ts" setup>
import logo from '@/assets/logos/logo.png'

import {
  NationalAccreditationCreateView,
  InternationalAccreditationCreateView,
  VehicleAccessCreateView,
  GeneralVehicleCreateView,
  NonCommercialAircraftCreateView,
  CommunicationEquipmentCreateView,
} from '@/router'
</script>

<template>
  <div class="drawer md:drawer-open">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
    />

    <div class="drawer-content">
      <div class="container p-5 md:mx-auto">
        <slot />
      </div>
    </div>

    <div class="drawer-side !flex flex-col shadow-xl">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>

      <div class="flex w-full items-center justify-center py-5">
        <img
          :src="logo"
          class="h-16"
        />
      </div>

      <ul class="menu w-80 flex-1 p-4">
        <li>
          <details open>
            <summary>Acreditaciones</summary>

            <ul>
              <li>
                <RouterLink :to="NationalAccreditationCreateView.path">
                  Acreditación Nacional
                </RouterLink>
              </li>

              <li>
                <RouterLink :to="InternationalAccreditationCreateView.path">
                  Acreditación Internacional
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details open>
            <summary>Vehículos</summary>

            <ul>
              <li>
                <RouterLink :to="VehicleAccessCreateView.path">
                  Acceso de Vehículos a Aeropuerto
                </RouterLink>
              </li>

              <li>
                <RouterLink :to="GeneralVehicleCreateView.path"> Vehículos Generales </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details open>
            <summary>Aeronaves</summary>

            <ul>
              <li>
                <RouterLink :to="NonCommercialAircraftCreateView.path">
                  Aeronaves No Comerciales
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details open>
            <summary>Comunicación</summary>

            <ul>
              <li>
                <RouterLink :to="CommunicationEquipmentCreateView.path">
                  Declaración de Equipo de Intercomunicación
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <ul class="menu w-80 p-4">
        <li>
          <button class="btn btn-error text-white">Cerrar Sesión</button>
        </li>
      </ul>
    </div>
  </div>
</template>
