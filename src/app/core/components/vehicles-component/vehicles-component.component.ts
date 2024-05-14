import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DataService, Vehicle } from '../../services/data.service';

@Component({
  selector: 'app-vehicles-component',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './vehicles-component.component.html',
  styleUrls: ['./vehicles-component.component.scss']
})
export class VehiclesComponentComponent implements OnInit {
  @Input() vehicles: Vehicle[] = [];  // Initialize with an empty array
  userName: string = '';

  constructor(private dataService: DataService) {}

  displayedColumns: string[] = ['name', 'type_name', 'brand_name', 'owner_name'];
  dataSource: Vehicle[] = [];  // Initialize with the correct type

  ngOnInit() {
    const userData = this.dataService.getUserData();
    if (userData) {
      this.userName = userData.user_name;
      this.dataService.getVehiclesById(userData.user_id, userData.token).subscribe(
        (vehicles: Vehicle[]) => {
          this.vehicles = vehicles;
          this.dataSource = vehicles;
        },
        (error) => {
          console.error('Error fetching vehicles: ', error);
        }
      );
    }
  }
}
