import { Component } from '@angular/core'
import { CarComponentComponent } from '../../components/car-component/car-component.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  AlternateLogoPath: string = 'assets/logo-alternate.png'
}
