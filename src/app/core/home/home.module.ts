import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module'
import { SubmitButtonComponent } from '../submit-button/submit-button.component'

@NgModule({
  exports: [SubmitButtonComponent],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule, SubmitButtonComponent],
  providers: [provideHttpClient(withFetch())],
})
export class HomeModule {}
