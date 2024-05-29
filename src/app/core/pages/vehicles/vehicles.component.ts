import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component';
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehiclesComponentComponent, NavbarComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  userToken: string = ''
  userId: number = 0
  userName: string = ''

  constructor(private dataService: DataService, private dialog: MatDialog) {}
  
  ngOnInit(): void {}

  private loadUserData(): void {
    const userData = this.dataService.getUserData()
    this.userId = userData?.user_id ?? 0
    this.userToken = userData?.token ?? ''
    this.userName = userData?.user_name ?? ''
  }
}
