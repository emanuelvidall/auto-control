import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component';
import { NavbarComponent } from '../../components/navbar/navbar.component'

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehiclesComponentComponent, NavbarComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  
}
