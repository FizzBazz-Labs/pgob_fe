<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import * as pbi from 'powerbi-client'
import * as API from '@/services/api'

const permissions = pbi.models.Permissions.Read
const token = ref('')
const embedUrl = ref('')

onBeforeMount(async () => {
  const response = await API.get('/powerbi-token/')
  const data = await response.json()

  token.value = data.token
  embedUrl.value = data.embedUrl

  const config = {
    type: 'report',
    tokenType: pbi.models.TokenType.Embed,
    accessToken: token.value,
    embedUrl: embedUrl.value,
    id: '116de701-d119-4ab8-962a-a07a906f45ac',
    pageView: 'fitToWidth',
    permissions: permissions,
  }

  const powerbi = new pbi.service.Service(
    pbi.factories.hpmFactory,
    pbi.factories.wpmpFactory,
    pbi.factories.routerFactory
  )
  const dashboardContainer = document.getElementById('container') as HTMLElement
  const dashboard = powerbi.embed(dashboardContainer, config)

  dashboard.off('loaded')
  dashboard.off('rendered')
  dashboard.on('error', function () {
    dashboard.off('error')
  })
})
</script>

<template>
  <span> </span>

  <div
    id="container"
    style="height: 800px"
  ></div>
</template>
