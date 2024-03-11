import { Component } from '@angular/core'
import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { Car } from '../../components/car-component/car-interface'
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarComponentComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  AlternateLogoPath: string = 'assets/logo-alternate.png'

  cars: Car[] = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, type: 'car' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, type: 'car' },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021, type: 'car' },
  ]
}
