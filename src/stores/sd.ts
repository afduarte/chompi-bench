import { defineStore } from 'pinia'

interface FileHandle {
  name: string
  handle: FileSystemHandle
  kind: 'file' | 'directory'
}

interface FileState {
  directoryHandle: FileSystemDirectoryHandle | null
  files: { [filename: string]: FileHandle }
}

export const useSDStore = defineStore('sd', {
  state: (): FileState => ({
    directoryHandle: null,
    files: {} // Initialized as an empty object indexed by filenames
  }),
  getters: {
    isReady: (state) => Object.keys(state.files).length > 0
  },
  actions: {
    async listSDCardContents() {
      try {
        if (!window.showDirectoryPicker) {
          throw new Error('The File System Access API is not supported in this browser.')
        }

        this.directoryHandle = await window.showDirectoryPicker()
        this.files = {}

        const directory = this.directoryHandle as unknown as AsyncIterable<
          [string, FileSystemHandle]
        >
        for await (const [name, handle] of directory) {
          this.files[name] = { name, handle, kind: handle.kind } // Store file by name (filename as key)
        }
      } catch (error) {
        console.error('Error reading SD card contents:', error)
      }
    },
    async readFile(filename: string): Promise<string | null> {
      try {
        const fileHandle = this.files[filename]?.handle
        if (!fileHandle || fileHandle.kind !== 'file') {
          throw new Error(`File ${filename} not found or not a valid file.`)
        }

        // Cast the handle to FileSystemFileHandle and read the file content
        const file = await (fileHandle as FileSystemFileHandle).getFile()
        return await file.text()
      } catch (error) {
        console.error(`Error reading file ${filename}:`, error)
        return null
      }
    },

    async editFile(filename: string, content: string) {
      try {
        const fileHandle = this.files[filename]?.handle

        if (!fileHandle || fileHandle.kind !== 'file') {
          throw new Error(`File ${filename} not found or not a valid file.`)
        }

        // Cast the handle to FileSystemFileHandle and write the new content
        const writable = await (fileHandle as FileSystemFileHandle).createWritable()
        await writable.write(content)
        await writable.close()
      } catch (error) {
        console.error(`Error writing to file ${filename}:`, error)
      }
    }
  }
})
