import { Component } from '@angular/core'
import { Car } from './car-interface'

@Component({
  selector: 'app-car-component',
  standalone: true,
  imports: [],
  templateUrl: './car-component.component.html',
  styleUrl: './car-component.component.scss',
})
export class CarComponentComponent {
  defaultCar: string = '/assets/defaultcar.jpg'
  carIcon: string = '/assets/car-icon.png'
  motorcycleIcon: string = '/assets/motorcycle-icon.png'
}
