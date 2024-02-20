import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule],
  providers: [provideHttpClient(withFetch())],
})
export class HomeModule {}
