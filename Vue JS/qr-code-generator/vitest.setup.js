import { vi } from 'vitest'

if (typeof globalThis.Image === 'undefined') {
  globalThis.Image = class {
    constructor() {
      this.onload = null
      this.onerror = null
    }
    set src(_) {
      if (typeof this.onload === 'function') {
        setTimeout(() => this.onload())
      }
    }
  }
}