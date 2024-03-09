<script lang="ts" setup>
import logo from '@/assets/logos/logo.png'

import { useAuthStore } from '@/stores/auth'

import {
  HomeView,
  LoginView,
  NationalAccreditationCreateView,
  InternationalAccreditationCreateView,
  VehicleAccessCreateView,
  GeneralVehicleCreateView,
  NonCommercialAircraftCreateView,
  CommunicationEquipmentCreateView,
  SecurityWeaponCreateView,
} from '@/router'

const auth = useAuthStore()
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
        <RouterLink :to="HomeView.path">
          <img
            :src="logo"
            class="h-16"
          />
        </RouterLink>
      </div>

      <ul class="menu w-80 flex-1 p-4">
        <li v-if="auth.hasNational || auth.hasInternational">
          <details open>
            <summary>Acreditaciones</summary>

            <ul>
              <li v-if="auth.hasNational">
                <RouterLink :to="NationalAccreditationCreateView.path">
                  Acreditación Nacional
                </RouterLink>
              </li>

              <li v-if="auth.hasInternational">
                <RouterLink :to="InternationalAccreditationCreateView.path">
                  Acreditación Internacional
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li v-if="auth.hasVehicleAccessAirport || auth.hasGeneralVehicle">
          <details open>
            <summary>Vehículos</summary>

            <ul>
              <li v-if="auth.hasVehicleAccessAirport">
                <RouterLink :to="VehicleAccessCreateView.path">
                  Acceso de Vehículos a Aeropuerto
                </RouterLink>
              </li>

              <li v-if="auth.hasGeneralVehicle">
                <RouterLink :to="GeneralVehicleCreateView.path"> Vehículos Generales </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li v-if="auth.hasAircraft">
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

        <li v-if="auth.hasCommunicationEquipment">
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

        <li v-if="auth.hasSecurity">
          <details open>
            <summary>Armas</summary>

            <ul>
              <li>
                <RouterLink :to="SecurityWeaponCreateView.path"> Acreditación de armas </RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <ul class="menu w-80 p-4">
        <li>
          <RouterLink
            :to="LoginView.path"
            class="btn btn-error text-white"
            @click="auth.logout"
          >
            Cerrar Sesión
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
