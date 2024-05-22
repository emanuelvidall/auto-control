import { NgFor, NgIf } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DialogComponent } from '../../components/dialog/dialog.component'
import {
  Vehicle,
} from '../../services/data.service'
import { DataService } from '../../services/data.service'
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
  vehicles: Vehicle[] = []
  selectedVehicleId: number | null = null
  // selectedVehicleExpenses: Expense[] = []
  myToken: string = ''
  myId: number = 0

  // readonly AlternateLogoPath: string = 'assets/logo-alternate.png'
  readonly CarIconPath: string = 'assets/car-icon.png'

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const vehicleId = params.get('vehicleId')
      if (vehicleId) {
        this.selectedVehicleId = parseInt(vehicleId, 10)
      }
      this.loadVehicles()
    })
  }

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

  selectVehicle(vehicleId: number): void {
    this.selectedVehicleId = vehicleId
    this.router.navigate(['/dashboard', vehicleId])
  }

  get selectedVehicle(): Vehicle | undefined {
    return this.vehicles.find(
      (vehicle) => vehicle.id === this.selectedVehicleId
    )
  }

  vehicleForward() {
    console.log(this.vehicles.length, 'vehicles')
    const index = this.vehicles.findIndex(
      (vehicle) => vehicle.id === this.selectedVehicleId
    )
    if (index < this.vehicles.length - 1) {
      this.selectVehicle(this.vehicles[index + 1].id)
    } else {
      this.selectVehicle(this.vehicles[0].id)
    }
  }

  vehicleBackward() {
    console.log(this.vehicles.length, 'vehicles')

    const index = this.vehicles.findIndex(
      (vehicle) => vehicle.id === this.selectedVehicleId
    )
    if (index > 0) {
      this.selectVehicle(this.vehicles[index - 1].id)
    } else {
      this.selectVehicle(this.vehicles[this.vehicles.length - 1].id)
    }
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
          if (!this.selectedVehicleId && vehicles.length > 0) {
            this.selectVehicle(vehicles[0].id)
          } else if (this.selectedVehicleId) {
            if (!vehicles.some((v) => v.id === this.selectedVehicleId)) {
              this.selectVehicle(vehicles[0].id)
            }
          }
        },
        error: (error) => console.error('Error fetching vehicles:', error),
      })
    } else {
      console.error('Invalid or missing user ID and token')
    }
  }
}
