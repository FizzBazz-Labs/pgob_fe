<script lang="ts" setup>
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline'

import logo from '@/assets/logos/logo.png'
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
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>

      <ul class="menu w-80 p-4">
        <li>
          <button class="btn btn-error text-white">
            Cerrar Sesión

            <ArrowLeftStartOnRectangleIcon class="h-6" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
