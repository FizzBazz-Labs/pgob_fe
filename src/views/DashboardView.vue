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
    'H4sIAAAAAAAEACWUx66DVgBE_-VtiYTpECkLejXdtB3NmHYvYHqUf8-Lsp_VOTPz94-bXwPMq58_fwLTDsePYfvHnOo5JZ3-p_ZIOlt8ZctqHFPpb4zez9naC3k3nynw5GHIPjdF-qHRpny2lUOYkpVuos3Xb5ttkitV05mSzXWl1R0G5hs-zV4LcpWi8TdQwdseJu8NyobJhcFwvzXPphNQl4Siyqw4lW7xz6rEL9zKhdxcSvFrU_jJh2YyE42cBlu_X3MTQt3SUam9y1uWCA7jyy3BfbuaaVpeG5i9xDslHgmSfclq8wYbHDetqM4FCVPlKX5LvWOducgJUIEuviFit_Gr1HWStzHVKmlp5XeFLDtaxPoKoV-qblqWxm4w7lTHrGVqltQDU9P8-NgFy5DSUy9cwmWiL2w6_evN6ps4L6oa_BCSkgb918Izy3BfW-vALlTDG40vrhwP_NUzkShSQiBJmBMnLdR6C4VD8ohUIU243rJ9jjQMElZNzr0JiNhLJ8x94GntjXkPIIyzQZIrte9ZQt7IVZfI50iBEcU9VYRnjAgvqjTCotcnNbArqr2mGHv-OoPIJUj9g7SG04C3ZrvnXlpgVC02xRvfegldAFBHstcEZAppPyPTs4OgwxAM7XrHDJ4QFzSu875pJKfL7DWENe6iohJ8A0otkK68tKKJ7lJwBXs_vSRim7IvfdV6nEBUkbEnGx1oimUiXrmf3JjiBOi_8lBXqO8rHrXeK9fPL98Sje11mi46XcZE5AYMHiEHCtcWekBdTFMK9ddHk5S7HztGaFJ9_PXXzx8_4nJNKzTr67fmsJ9Yi4vKN5qvkSV9qLLDaP2SObsD1jMuwUXmcsZ6c49a7GQ9PWIzE4-uRi-Bt7p0KMtITbGL4dkFB06IVL_RZ8O9KgDMB0eaRkSIdWojRLRNEAtJ6q5gxPiAjpyFCAxXvpJlG6Yif8-HJta5ipDt872_wBif-VmXFJMGlxUTQf1u97XWXISzGjjV795xEfBFjiEXjKN5PDABFXP2pYpJcnnyGOkeYV81x7G8aYS9eFeFfddlEydFkI9463YUCUpiPEDPkT0-Z0MqL6uAwNvp9XvtyqF1GDJD6J0HKVWo-EWdQLfayrXn4hHo68NY4tt603XcPYB20lX35JnW20jfpPn_MV_Tp1706JfyFOcDJJ7EOiPXq8KjuSDX438ZQduAfN2W-jem4p6l0tTCRAxfst6lzibTFDYmocaXdE89F9h5jBp-nQuswqrAflD1mjHnEBBmda-H2UUPXiwUGt-05YSL0w2baSlELCaOVwDXBWdx_85BEj5kKO6Dnd5ENe7nvaifWAzw4lLNa7Iqghj1NzvOFP7w71INxDubN2LJgQ_9gWhmZW70xKpypFY9nJvkXuHbfSfd__7wyWqY1zHVhKb4d3x25RxbEE7Yy7OfpM261iuSHAwqh3Mf2LQH3QiHdH_ow6SI4jCz35lpHKESwuxTf9bqGLNCRvSYZDfvPth68m3vmeGfctJaTBkN59y3pAHqpycl5Rw5BfdfDxLodkhgmyV83pr3i_mffwFlo7Ni2gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzE1OTYyMzk2LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=',
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
