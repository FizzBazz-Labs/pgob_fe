<script lang="ts" setup>
import { watch, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import * as pbi from 'powerbi-client'
import * as API from '@/services/api'

const permissions = pbi.models.Permissions.Read

const route = useRoute()

onMounted(() => {
  const reportId = route.query.reportId as string
  showReport(reportId)
})

async function showReport(reportId: string) {
  const response = await API.get(`/powerbi-token/${reportId}`)
  const data = await response.json()

  const config: pbi.IEmbedConfiguration = {
    type: 'report',
    tokenType: pbi.models.TokenType.Embed,
    accessToken: data.token,
    embedUrl: data.embedUrl?.embedUrl,
    id: reportId,
    pageView: 'fitToWidth',
    permissions: permissions,
  }

  const powerbi = new pbi.service.Service(
    pbi.factories.hpmFactory,
    pbi.factories.wpmpFactory,
    pbi.factories.routerFactory
  )

  const dashboardContainer = document.getElementById('container') as HTMLElement
  powerbi.reset(dashboardContainer)

  const dashboard = powerbi.embed(dashboardContainer, config)

  dashboard.off('loaded')
  dashboard.off('rendered')
  dashboard.on('error', function () {
    dashboard.off('error')
  })
}

watch(
  () => route.query.reportId,
  value => {
    showReport(value as string)
  }
)
</script>

<template>
  <span> </span>

  <div
    id="container"
    style="height: 800px"
  ></div>
</template>
