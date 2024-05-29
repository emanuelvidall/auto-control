import { NgFor, NgIf } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DialogComponent } from '../../components/dialog/dialog.component'
import { DataService, Vehicle } from '../../services/data.service'
import { ExpenseComponentComponent } from '../../components/expense-component/expense-component.component'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

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
  userToken: string = ''
  userId: number = 0

  // readonly AlternateLogoPath: string = 'assets/logo-alternate.png'
  readonly CarIconPath: string = 'assets/car-icon.png'

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeRouteListener()
    this.loadUserData()
    this.loadVehicles()
  }

  private initializeRouteListener(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const vehicleId = params.get('vehicleId')
      if (vehicleId) {
        this.selectedVehicleId = parseInt(vehicleId, 10)
      }
    })
  }

  private loadUserData(): void {
    const userData = this.dataService.getUserData()
    this.userId = userData?.user_id ?? 0
    this.userToken = userData?.token ?? ''
  }

  public onVehicleDeleted() {
    this.loadVehicles()
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { userToken: this.userToken, userId: this.userId },
    })

    const subscription: Subscription =
      dialogRef.componentInstance.vehicleAdded.subscribe({
        next: (newVehicle: Vehicle) => {
          this.addVehicle(newVehicle)
        },
        error: (error: any) =>
          console.error('Error when adding vehicle:', error),
      })

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log('The dialog was closed. Result:', result)
        subscription.unsubscribe()
      },
      error: (error) => console.error('Error on dialog close:', error),
    })
  }

  private addVehicle(newVehicle: Vehicle): void {
    this.vehicles.push(newVehicle)
    console.log('New vehicle added:', newVehicle)
  }

  private selectVehicle(vehicleId: number): void {
    this.selectedVehicleId = vehicleId
    this.router.navigate(['/dashboard', vehicleId])
  }

  get selectedVehicle(): Vehicle | undefined {
    return this.vehicles.find(
      (vehicle) => vehicle.id === this.selectedVehicleId
    )
  }

  public vehicleForward(): void {
    this.navigateVehicle(1)
  }

  public vehicleBackward(): void {
    this.navigateVehicle(-1)
  }

  private navigateVehicle(direction: number): void {
    const vehiclesWithId = this.vehicles.filter(
      (vehicle): vehicle is Vehicle & { id: number } => vehicle.id !== undefined
    )

    const index = vehiclesWithId.findIndex(
      (vehicle) => vehicle.id === this.selectedVehicleId
    )
    if (index !== -1) {
      const newIndex =
        (index + direction + vehiclesWithId.length) % vehiclesWithId.length
      this.selectVehicle(vehiclesWithId[newIndex].id)
    }
  }

  private loadVehicles(): void {
    if (this.userId && this.userToken) {
      this.fetchVehicles(this.userId, this.userToken)
    } else {
      console.error('User ID or token not found:', this.userId, this.userToken)
    }
  }

  private fetchVehicles(userId: number, userToken: string): void {
    this.dataService.getVehiclesById(userId, userToken).subscribe({
      next: (vehicles) => this.handleVehicleLoadSuccess(vehicles),
      error: (error) => console.error('Error fetching vehicles:', error),
    })
  }

  private handleVehicleLoadSuccess(vehicles: Vehicle[]): void {
    this.vehicles = vehicles
    console.log('Loaded vehicles:', vehicles)
    this.ensureSelectedVehicle()
  }

  private ensureSelectedVehicle(): void {
    const vehiclesWithId = this.vehicles.filter(
      (vehicle): vehicle is Vehicle & { id: number } => vehicle.id !== undefined
    )

    if (vehiclesWithId.length > 0) {
      if (
        !this.selectedVehicleId ||
        !vehiclesWithId.some((v) => v.id === this.selectedVehicleId)
      ) {
        this.selectVehicle(vehiclesWithId[0].id)
      }
    }
  }

  public hasVehicles(): boolean {
    return this.vehicles.length > 0
  }
}
