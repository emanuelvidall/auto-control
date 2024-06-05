import { Component, Input, OnInit } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { Router } from '@angular/router'
import { Vehicle } from '../../services/data.service'

@Component({
  selector: 'app-selected-vehicles',
  standalone: true,
  imports: [NavbarComponent, CarComponentComponent],
  templateUrl: './selected-vehicles.component.html',
  styleUrl: './selected-vehicles.component.scss',
})
export class SelectedVehiclesComponent implements OnInit {
  vehicle!: Vehicle
  userToken: string = ''

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state) {
      ({ vehicle: this.vehicle, userToken: this.userToken } = state)
    }
  }

  ngOnInit(): void {
    console.log('Selected vehicle:', this.vehicle)
  }
}
