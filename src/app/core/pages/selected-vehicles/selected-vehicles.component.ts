import { Component, Input, OnInit } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { ExpenseComponentComponent } from '../../components/expense-component/expense-component.component'
import { Router } from '@angular/router'
import { Vehicle } from '../../services/data.service'

@Component({
  selector: 'app-selected-vehicles',
  standalone: true,
  imports: [NavbarComponent, CarComponentComponent, ExpenseComponentComponent],
  templateUrl: './selected-vehicles.component.html',
  styleUrl: './selected-vehicles.component.scss',
})
export class SelectedVehiclesComponent implements OnInit {
  vehicle: Vehicle = {
    name: '',
    type: 0,
    brand: 0,
    year: 0,
    license_plate: '',
    owner: 0,
  }
  userToken: string = ''

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state) {
      ;({ vehicle: this.vehicle, userToken: this.userToken } = state)
    }
  }

  ngOnInit(): void {}
}
