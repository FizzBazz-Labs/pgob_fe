import { defineStore } from 'pinia'

type GlobalState = {
  token: string
}

const initState = (): GlobalState => ({
  token: '',
})

export const useGlobalStore = defineStore('global', {
  state: initState,
})
