import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { MatDialogModule } from '@angular/material/dialog'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  exports: [SubmitButtonComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    SubmitButtonComponent,
    MatDialogModule,
    // BrowserAnimationsModule,
  ],
  providers: [provideHttpClient(withFetch())],
})
export class HomeModule {}
