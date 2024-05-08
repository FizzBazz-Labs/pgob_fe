<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'

import { computed } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import { AccreditationType } from '@/entities/Accreditation'

import { HomeView, LoginView, UserListView, ProfileView } from '@/router'

const config = useConfigStore()
const auth = useAuthStore()

function hasAdminProfile() {
  if (!auth.isTransportationManager && !auth.isUser) {
    return true
  }
}

function hasTransportationProfile() {
  if (auth.isTransportationManager) {
    return true
  }
}

const accreditations = computed(() => [
  {
    label: 'Acreditaciones Internacionales',
    to: { name: 'international-list' },
    canView: hasAdminProfile() || hasTransportationProfile() || auth.hasInternational,
  },

  {
    label: 'Vehículos Generales',
    to: { name: 'general-vehicles-list' },
    canView: hasAdminProfile() || hasTransportationProfile() || auth.hasGeneralVehicle,
  },
  {
    label: 'Equipo de Intercomunicación',
    to: { name: 'communication-equipment-list' },
    canView: hasAdminProfile() || auth.isTransportationManager || auth.hasCommunicationEquipment,
  },

  {
    label: 'Aeronaves No Comerciales',
    to: { name: 'non-commercial-aircraft-list' },
    canView: hasAdminProfile() || auth.isTransportationManager || auth.hasAircraft,
  },

  {
    label: 'Residentes',
    to: { name: 'housing-list' },
    canView: auth.isAdmin || auth.hasHousing,
  },

  {
    label: 'Comercio',
    to: { name: 'commerce-list' },
    canView: auth.isAdmin || auth.hasCommerce,
  },
  {
    label: 'Declaración de Vehículos de Acceso a Aeropuerto',
    to: { name: 'vehicle-access-list' },
    canView: hasAdminProfile() || hasTransportationProfile() || auth.hasVehicleAccessAirport,
  },

  {
    label: 'Acreditación de Armas',
    to: { name: 'security-list' },
    canView: hasAdminProfile() || auth.hasSecurity,
  },
])
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
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="avatar btn btn-circle"
            >
              <div class="w-7 rounded-full">
                <UserCircleIcon />
              </div>
            </div>

            <ul
              class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
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
          </div>
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
        <li v-if="auth.isAdmin">
          <RouterLink :to="UserListView.path">Usuarios</RouterLink>
        </li>

        <li>
          <RouterLink :to="{ name: 'accreditation-certificate' }">
            {{ 'Generar Acreditación' }}
          </RouterLink>
        </li>

        <li>
          <details open>
            <summary>Acreditaciones</summary>

            <ul>
              <li v-if="hasAdminProfile() || auth.hasNational">
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.NATIONAL } }"
                >
                  Acreditación Nacional
                </RouterLink>
              </li>

              <li v-if="hasAdminProfile() || hasTransportationProfile() || auth.hasInternational">
                <RouterLink
                  :to="{ path: HomeView.path, query: { type: AccreditationType.INTERNATIONAL } }"
                >
                  Acreditación Internacional
                </RouterLink>
              </li>
            </ul>

            <ul>
              <li
                v-for="(item, i) in accreditations.filter(item => item.canView)"
                :key="`accreditation-link-${i}`"
              >
                <RouterLink :to="item.to">
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
