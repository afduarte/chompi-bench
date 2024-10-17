// src/types/globals.d.ts
export {}

declare global {
  interface Window {
    showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>
  }
}
