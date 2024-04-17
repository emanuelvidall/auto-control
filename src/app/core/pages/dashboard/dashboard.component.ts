import { Component, OnInit } from '@angular/core'
import { Car } from '../../components/car-component/car-interface'
import { NgFor, NgIf } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'

import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { DialogComponent } from '../../components/dialog/dialog.component'
import {
  UserData,
  Vehicle,
  userDataSessionStorage,
} from '../../services/data.service'
import { DataService } from '../../services/data.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarComponentComponent, NgFor, NgIf, SubmitButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  userData: userDataSessionStorage | null = null

  vehicles: Vehicle[] = []

  teste = {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {},
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('userData')
    const parsedUserData = userData ? JSON.parse(userData) : null
    const id = parsedUserData?.user_id
    const token = parsedUserData?.token
    this.dataService.getVehiclesById(id, token).subscribe(
      (carros) => {
        console.log(carros, 'carros') // Now 'carros' will log the actual data
      },
      (error) => {
        console.error('Error fetching vehicles:', error)
      }
    )
    console.log('id', id)
    console.log('user data fetched!', parsedUserData)
    return parsedUserData
  }

  AlternateLogoPath: string = 'assets/logo-alternate.png'
  CarIconPath: string = 'assets/car-icon.png'
}
