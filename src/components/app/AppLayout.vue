<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import { AccreditationType } from '@/entities/Accreditation'

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
  ProfileView,
  NationalAccreditationTableView,
} from '@/router'
import AccreditationListView from '@/views/AccreditationListView.vue'
import type { patch } from '@/services/api'

const config = useConfigStore()
const auth = useAuthStore()
</script>

<template>
  <div
    v-if="config.available"
    class="drawer md:drawer-open"
  >
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
    />

    <div class="drawer-content">
      <div class="navbar sticky top-0 z-10 w-full bg-white shadow-md">
        <div class="flex-1"></div>
        <div class="flex-none">
          <ul class="menu menu-horizontal">
            <li>
              <details>
                <summary>Usuario</summary>

                <ul>
                  <li>
                    <RouterLink
                      :to="ProfileView.path"
                      class="min-w-[150px]"
                    >
                      {{ `${auth.user.firstName} ${auth.user.lastName}` }}
                    </RouterLink>
                  </li>

                  <li>
                    <RouterLink
                      v-if="auth.isAnonymous"
                      :to="LoginView.path"
                    >
                      Iniciar Sesión
                    </RouterLink>

                    <RouterLink
                      v-else
                      :to="LoginView.path"
                      class="text-error"
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
            :src="config.logo"
            class="h-16"
          />
        </RouterLink>
      </div>

      <ul class="menu w-80 flex-1 p-4">
        <!-- <li>
          <RouterLink :to="{ path: HomeView.path, query: { param1: 'value1', param2: 'value2' } }">
            Lista de acreditaciones
          </RouterLink>
        </li> -->

        <li v-if="auth.isAdmin">
          <RouterLink :to="UserListView.path">Usuarios</RouterLink>
        </li>

        <li>
          <details open>
            <summary>Acreditaciones</summary>

            <ul v-if="!auth.isTransportationManager && !auth.isUser">
              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.NATIONAL } }"
                >
                  Acreditación Nacional
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.INTERNATIONAL } }"
                >
                  Acreditación Internacional
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.EQUIPMENTS } }"
                >
                  Declaración de Equipo de Intercomunicación
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.SECURITIES } }"
                >
                  Acreditación de armas
                </RouterLink>
              </li>
            </ul>

            <ul
              v-if="
                auth.isTransportationManager || auth.isAccreditor || auth.isAdmin || auth.isReviewer
              "
            >
              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.ACCESSVEHICLES } }"
                >
                  Acceso de Vehículos a Aeropuerto
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.GENERALVEHICLES } }"
                >
                  Vehículos Generales
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.AIRFCRAFTS } }"
                >
                  Aeronaves No Comerciales
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <!-- <li v-if="auth.hasVehicleAccessAirport || auth.hasGeneralVehicle">
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
        </li> -->
      </ul>

      <ul>
        <li>
          <RouterLink :to="NationalAccreditationTableView.path">
            Lista de acreditaciones
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
