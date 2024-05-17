<script lang="ts" setup>
import { onMounted } from 'vue'
import * as pbi from 'powerbi-client'

const permissions = pbi.models.Permissions.Read

const TENANT_ID = import.meta.env.VITE_TENANT_ID
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

const config = {
  type: 'report',
  tokenType: pbi.models.TokenType.Embed,
  accessToken:
    'H4sIAAAAAAAEAC2Ux66rWAJF_-VOaYloMC29AcEEk0wOM6IP-ZBDqf69b5dqvkZrh79-PunVjWnx89-f5OOgSpFtsgH5NTo-u62sxL7ITL_gCnpGO53qfZUWb5mKxLTkYgwmdKNV-ZktEq2OL3ZBOfp-BhIaXkTMJNSK-MAQySTTsecGKxJ2tC5SzjYi2rWOnN7d0luHUtveHPSjVmZXjY89oXT0e1D3VClGkkwoSpMna0qRfafDPJ_zvHB9prAmXMRS8e2_M1l0jUnOPuXKqN0dK_G314ZXeI1NqX1qNvDr11T5e2fN2gd-doMzYkYgeOi2JmJYWEw6y_HuZx2hzd0saEWTHvjHvCzJbvJMy8ZQfbstJKn5Ejo7HHogffkoOptT7XQ19mzL-6h36VpobdRSAjARtZ92Uba6YzPPjpxAwDHMkUb8LOQNQ_DDQEsBWlgFjhGR8hLyOudsEzcfHuoRindBY1bJTsklWsLHThjpL-oHR5P5gAVrfSbNYTMth771gsWDhUpc0TNIRpUylz7INEDrT9QanskuVBcuUx2vdH7fiUfn-R5prcY9MWfyu_4x9AiVbbofS7yWgGtG7ci9oTKx6atQL8g8dIqJHl2pwt1LeMjJcF1ls2Nf-7PoLnXYsjF9ty6YK1RCQr8mp-zTV2BxGNFqCtbw2Z1vlKylEIYdGrxkdfe4RleiAFETD1ZgsuesqO_tRg6SyG62DR6PRTsANfiXcx0FWihscdLr5xYKDXM-pGmxfoUcQL_4Ck3HtlnW9MWr7dgQdrXNK2mFW3jb8JO5St9hldf13z9_fv7zI8wXXEetvH5rDkezlndRcQSWITqFKQ01YyeAUar8ssjZLSRJnlqd23AOmjoySq1ODE0T6Cd9W1tFRC90DI0-YN2ckNs65SAr9iMkiX3XWkQEmiDy9ZtqpjI5Z9WHx63KOm-_EbsX2dzGSklGq5F-K3RzbwU4MoQOF5QXWbNElvUcOKUzUVmBvjqXuVAN344pzqZXXo73RaF0dUtszumIB-_pRe5saDTwW4BdDFvQVVjnvG1xVgnxzCjphWn6XI6YRV-K38KpyFaGFB7ARvfUEx34tWYsq5fb9TFPNOxwV9POqXqwZEbNpGGevZBQkQaLaGkBPohVKMC6pTVp8HlUp4LZVyxz0l6gwn81XxCUsxr8Wv79AYTEXkYkaUSHbfh5gAnl_qHc-juk6zaXv5i_KL2-kUUNlJUZIMPsjmMQ-oJj2UQnWyDS-dobPDjFM2STuROEiW-MggrJVg_kY_P1h6E8G29tr12zdAwsAYenArifiXk-ViP3JXCRccJzNk0usi1T62160v2kNoFDsJJ4Y-GKawyienSVPNgJH1nAWkvWfQ1-bZ3atUabP9TNovhQSCve_qJPFE7sMLfhwSxu_JRGtw6JgiAg7SI94A0OaCJNoVWDbNOXteoIAU0DrCK7uL2qJyX8xN8OH6N3evJ4_bvMahhc2VV5BbmkKXD3Cl-tfEWuCyhPUa99w2PW1fcalCvDb3lzJW3yfKE2VN_GeeXGozBIC5_ra-o-kqkd_x_G3_8D5q4VIdoFAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzE1OTMyODI3LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=',
  embedUrl:
    'https://app.powerbi.com/reportEmbed?reportId=2a3fa927-5ba8-4e81-ac4a-af0ef302e319&groupId=76789884-6d41-48a4-a09a-2004737d536e&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19',
  id: '2a3fa927-5ba8-4e81-ac4a-af0ef302e319',
  pageView: 'fitToWidth',
  permissions: permissions,
}

onMounted(() => {
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

  console.log(getAccessToken())
})

async function getAccessToken() {
  const response = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      resource: 'https://analysis.windows.net/powerbi/api',
    }),
  })
  const data = await response.json()
  return data.access_token
}
</script>

<template>
  <span> </span>

  <div
    id="container"
    style="height: 800px"
  ></div>
</template>
