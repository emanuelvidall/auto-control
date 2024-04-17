import { Component, Input } from '@angular/core'
import { Vehicle } from '../../services/data.service'

@Component({
  selector: 'app-car-component',
  standalone: true,
  imports: [],
  templateUrl: './car-component.component.html',
  styleUrl: './car-component.component.scss',
})
export class CarComponentComponent {
  defaultCar: string = '/assets/defaultcar.jpg'

  @Input() car!: Vehicle
}
