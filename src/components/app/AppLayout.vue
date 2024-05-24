<script lang="ts" setup>
import { UserCircleIcon, SparklesIcon } from '@heroicons/vue/24/outline'

import { ref, computed } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import { LoginView, UserListView, ProfileView, DashboardView } from '@/router'

const config = useConfigStore()
const auth = useAuthStore()

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

const helpDialog = ref<HTMLDialogElement>()
const helpInformation = ref({ title: '', url: '' })
const helpItems = ref([
  {
    title: 'Nacional',
    show: () => auth.hasNational,
    items: [
      {
        title: 'Crear',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Editar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Verificar/Rechazar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Importar/Exportar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Aprobar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Generación Masiva',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Impresión Individual',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
    ],
  },
  {
    title: 'Internacional',
    show: () => auth.hasInternational,
    items: [
      {
        title: 'Crear',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => auth.isUser,
      },
      {
        title: 'Editar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Verificar/Rechazar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Importar/Exportar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Aprobar',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Generación Masiva',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
      {
        title: 'Impresión Individual',
        url: 'https://www.youtube.com/embed/hsXeFqj5p7Q?si=C8grEIIDLqFhifox',
        show: () => true,
      },
    ],
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
              class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li
                v-for="(parent, i) in helpItems.filter(item => item.show())"
                :key="`parent-${i}`"
              >
                <details>
                  <summary>
                    {{ parent.title }}
                  </summary>

                  <ul>
                    <li
                      v-for="(child, j) in parent.items.filter(item => item.show())"
                      :key="`child-${i}-${j}`"
                    >
                      <button
                        @click="
                          () => {
                            helpInformation = {
                              title: `${parent.title} | ${child.title}`,
                              url: child.url,
                            }

                            helpDialog?.showModal()
                          }
                        "
                      >
                        {{ child.title }}
                      </button>
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

              <li>
                <details>
                  <summary>
                    <SparklesIcon class="size-4" />
                    Ayuda
                  </summary>

                  <ul>
                    <li
                      v-for="(parent, i) in helpItems.filter(item => item.show())"
                      :key="`parent-${i}`"
                    >
                      <details>
                        <summary>
                          {{ parent.title }}
                        </summary>

                        <ul>
                          <li
                            v-for="(child, j) in parent.items.filter(item => item.show())"
                            :key="`child-${i}-${j}`"
                          >
                            <button
                              @click="
                                () => {
                                  helpInformation = {
                                    title: `${parent.title} | ${child.title}`,
                                    url: child.url,
                                  }

                                  helpDialog?.showModal()
                                }
                              "
                            >
                              {{ child.title }}
                            </button>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
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
          <RouterLink :to="DashboardView.path"> Reporte Presidencial </RouterLink>
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

  <dialog
    ref="helpDialog"
    class="modal"
  >
    <div class="modal-box min-w-fit">
      <h3 class="mb-4 text-lg font-bold">
        {{ helpInformation.title }}
      </h3>

      <iframe
        width="560"
        height="315"
        :src="helpInformation.url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <div class="modal-action justify-end">
        <button
          class="btn btn-success text-white"
          @click="helpDialog?.close()"
        >
          Cerrar
        </button>
      </div>
    </div>
  </dialog>
</template>
