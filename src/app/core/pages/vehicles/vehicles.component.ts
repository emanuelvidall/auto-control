import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component';
import { DataService, Vehicle } from '../../services/data.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehiclesComponentComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  
}
