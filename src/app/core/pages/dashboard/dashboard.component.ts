import { Car } from '../../components/car-component/car-interface'
import { NgFor, NgIf } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Router } from '@angular/router'

import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DialogComponent } from '../../components/dialog/dialog.component'
import {
  UserData,
  Vehicle,
  userDataSessionStorage,
} from '../../services/data.service'
import { DataService } from '../../services/data.service'
import { Observable } from 'rxjs'
import { ExpenseComponentComponent } from '../../components/expense-component/expense-component.component'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CarComponentComponent,
    NgFor,
    NgIf,
    SubmitButtonComponent,
    ExpenseComponentComponent,
    MatIconModule,
    MatMenuModule,
    NavbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  userData: userDataSessionStorage | null = null
  vehicles: Vehicle[] = []
  myToken = ''
  myId = 0

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles()
  }

  AlternateLogoPath: string = 'assets/logo-alternate.png'
  CarIconPath: string = 'assets/car-icon.png'

  onVehicleDeleted() {
    this.loadVehicles()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { token: this.myToken, id: this.myId },
    })

    const sub = dialogRef.componentInstance.vehicleAdded.subscribe({
      next: (newVehicle: Vehicle) => {
        this.vehicles.push(newVehicle)
        console.log('New vehicle added:', newVehicle)
      },
      error: (error: any) => console.error('Error when adding vehicle:', error),
    })

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log('The dialog was closed. Result:', result)
        sub.unsubscribe()
      },
      error: (error) => console.error('Error on dialog close:', error),
    })
  }

  loadVehicles() {
    const userData = this.dataService.getUserData()
    const id = userData?.user_id ?? 0
    const token = userData?.token ?? ''

    this.myId = id
    this.myToken = token

    if (id && token) {
      this.dataService.getVehiclesById(id, token).subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles
          console.log(vehicles, 'Loaded vehicles')
        },
        error: (error) => console.error('Error fetching vehicles:', error),
      })
    } else {
      console.error('Invalid or missing user ID and token')
    }
  }
}
