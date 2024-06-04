import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public runInBrowser(callback: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      callback()
    } else {
      console.log('Running in a non-browser environment')
    }
  }
}
