import { Component, OnInit } from '@angular/core'
import { Car } from '../../components/car-component/car-interface'
import { NgFor, NgIf } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Router } from '@angular/router'

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
import { ExpenseComponentComponent } from '../../components/expense-component/expense-component.component'

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {}
  userData: userDataSessionStorage | null = null
  vehicles: Vehicle[] = []
  myToken = ''
  myId = ''
  teste = {}
  loginPath = ''

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { token: this.myToken, id: this.myId },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('userData')
    const parsedUserData = userData ? JSON.parse(userData) : null
    const id = parsedUserData?.user_id
    this.myId = id
    const token = parsedUserData?.token
    this.myToken = token
    this.dataService.getVehiclesById(id, token).subscribe(
      (carros) => {
        this.vehicles = carros
        console.log(carros, 'carros')
      },
      (error) => {
        console.error('Error fetching vehicles:', error)
      }
    )

    console.log('id', id)
    console.log('user data fetched!', parsedUserData)
    return parsedUserData
  }

  logout() {
    sessionStorage.removeItem('userData')
    this.router.navigate([this.loginPath])
  }

  AlternateLogoPath: string = 'assets/logo-alternate.png'
  CarIconPath: string = 'assets/car-icon.png'
}
