import { defineStore } from 'pinia'
import { useSDStore } from './sd'

export interface Options {
  chompi: Option[]
}

export interface Option {
  name: string
  value: string | number | boolean
}

export const useOptionsStore = defineStore('options', {
  state: () => ({
    options: {} as Options,
    fileRead: false
  }),
  actions: {
    async readFile() {
      try {
        const sdStore = useSDStore()
        const asText = await sdStore.readFile('options.json')
        if (!asText) {
          throw new Error()
        }
        this.options = JSON.parse(asText)
      } catch (e) {
        throw new Error('Failed to read options.json file from the selected location 🫣')
      }
    },
    async saveFile() {
      try {
        const sdStore = useSDStore()
        await sdStore.editFile('options.json', JSON.stringify(this.options))
      } catch (e) {
        throw new Error('Failed to read options.json file from the selected location 🫣')
      }
    },
    clearOptions() {
      this.options = {} as Options
    }
  }
})
