<script lang="ts" setup>
import logo from '@/assets/logos/logo.png'

import { useConfigStore } from '@/stores/config'
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
  UserListView,
  DashboardView,
} from '@/router'

const config = useConfigStore()
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

    <div
      v-if="config.available"
      class="drawer-side !flex flex-col shadow-xl"
    >
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>

      <div class="flex w-full items-center justify-center py-5">
        <RouterLink :to="HomeView.path">
          <img
            :src="config.logo"
            class="h-16"
          />
        </RouterLink>
      </div>

      <ul
        v-if="!auth.isTransportationManager"
        class="menu w-80 flex-1 p-4"
      >
        <li v-if="auth.isAdmin">
          <RouterLink :to="DashboardView.path">Tableo de Información</RouterLink>
          <RouterLink :to="UserListView.path">Usuarios</RouterLink>
          <RouterLink :to="HomeView.path"> Acreditaciones </RouterLink>
        </li>

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

      <div
        v-else
        class="flex-1"
      ></div>

      <ul class="menu w-80 p-4">
        <li>
          <details open>
            <summary>Usuario</summary>

            <ul>
              <li>
                <a>
                  {{ auth.user?.email }}
                </a>
              </li>

              <li>
                <RouterLink
                  v-if="auth.isAnonymous"
                  :to="LoginView.path"
                  class="btn btn-primary text-white"
                >
                  Iniciar Sesión
                </RouterLink>

                <RouterLink
                  v-else
                  :to="LoginView.path"
                  class="btn btn-error text-white"
                  @click="auth.logout"
                >
                  Cerrar Sesión
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
