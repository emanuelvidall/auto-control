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
  Vehicle: Car = {
    make: 'Volkswagen',
    model: 'Polo 1.6',
    year: '2009',
    pictureUrl: '',
    type: 'car',
    expenses: 'R$12.000,00',
  }
  defaultCar: string = '/assets/defaultcar.jpg'
  carIcon: string = '/assets/car-icon.png'
  motorcycleIcon: string = '/assets/motorcycle-icon.png'
}
