<script lang="ts" setup>
import { UserCircleIcon, SparklesIcon } from '@heroicons/vue/24/outline'

import { ref, computed, onMounted } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { getReports, type PowerBiReport } from '@/services/PowerBiService'

import { LoginView, UserListView, ProfileView } from '@/router'

const config = useConfigStore()
const auth = useAuthStore()
const general = useGeneralStore()

const accreditations = computed(() => [
  {
    label: 'Internacional',
    to: { name: 'international-list' },
    canView: auth.hasInternational,
  },
  {
    label: 'Nacional',
    to: { name: 'national-list' },
    canView: auth.hasNational,
  },

  {
    label: 'Vehículos Generales',
    to: { name: 'general-vehicles-list' },
    canView: auth.hasGeneralVehicle,
  },
  {
    label: 'Equipo de Intercomunicación',
    to: { name: 'communication-equipment-list' },
    canView: auth.hasCommunicationEquipment,
  },

  {
    label: 'Aeronaves No Comerciales',
    to: { name: 'non-commercial-aircraft-list' },
    canView: auth.hasAircraft,
  },

  {
    label: 'Residentes',
    to: { name: 'housing-list' },
    canView: auth.hasHousing,
  },

  {
    label: 'Comercio',
    to: { name: 'commerce-list' },
    canView: auth.hasCommerce,
  },
  {
    label: 'Declaración de Vehículos de Acceso a Aeropuerto',
    to: { name: 'vehicle-access-list' },
    canView: auth.hasVehicleAccessAirport,
  },

  {
    label: 'Acreditación de Armas',
    to: { name: 'security-list' },
    canView: auth.hasSecurity,
  },
])

const reports = ref<PowerBiReport[]>([])

onMounted(() => {
  getPowerBiReportList()
})

// functions
async function getPowerBiReportList() {
  const response = await getReports()

  reports.value = response.map(i => ({
    label: i.name,
    to: { name: 'dashboard' },
    reportId: i.reportId,
  }))
}
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

        <div class="flex gap-2">
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn"
            >
              Ayuda
              <SparklesIcon class="size-4" />
            </div>

            <ul
              v-if="general.help.length > 0"
              class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li
                v-for="(parent, i) in general.help"
                :key="`parent-${i}`"
              >
                <details>
                  <summary>
                    {{ parent.title }}
                  </summary>

                  <ul>
                    <li
                      v-for="(child, j) in parent.items"
                      :key="`child-${i}-${j}`"
                    >
                      <a
                        :href="child.url"
                        target="_blank"
                      >
                        {{ child.title }}
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn"
            >
              {{ `${auth.user.firstName} ${auth.user.lastName}` }}

              <div class="avatar">
                <div class="w-7 rounded-full">
                  <UserCircleIcon />
                </div>
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
                  Perfil
                </RouterLink>
              </li>

              <div class="divider my-0"></div>

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
        <img
          :src="config.logo"
          class="h-16"
        />
      </div>

      <ul class="menu w-80 flex-1 p-4">
        <li v-if="auth.isAdmin">
          <RouterLink :to="UserListView.path">Usuarios</RouterLink>
        </li>
        <li v-if="!auth.isUser">
          <details open>
            <summary>Reportes</summary>
            <ul>
              <li
                v-for="(item, i) in reports.filter(item => item.canView)"
                :key="`reports-link-${i}`"
              >
                <RouterLink
                  :to="{
                    name: String(item.to.name),
                    query: { reportId: item.reportId },
                  }"
                >
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li v-if="auth.isAccreditor">
          <RouterLink :to="{ name: 'accreditation-certificate' }">
            {{ 'Imprimir Acreditaciones' }}
          </RouterLink>
        </li>

        <li>
          <details open>
            <summary>Visor Acreditaciones</summary>
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
