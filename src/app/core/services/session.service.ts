import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
    return null
  }

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(key)
    }
  }
}
