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
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeRouteListener()
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
      data: { token: this.userToken, id: this.userId },
    })

    const sub = dialogRef.componentInstance.vehicleAdded.subscribe({
      next: (newVehicle: Vehicle) => {
        this.addVehicle(newVehicle)
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
    const index = this.vehicles.findIndex(
      (vehicle) => vehicle.id === this.selectedVehicleId
    )
    if (index !== -1) {
      const newIndex =
        (index + direction + this.vehicles.length) % this.vehicles.length
      this.selectVehicle(this.vehicles[newIndex].id)
    }
  }

  private loadVehicles(): void {
    this.loadUserData()
    const userId = this.userId
    const userToken = this.userToken

    if (userId && userToken) {
      this.fetchVehicles(userId, userToken)
    } else {
      console.error('User ID or token not found:', userId, userToken)
    }
  }

  private fetchVehicles(userId: number, token: string): void {
    this.dataService.getVehiclesById(userId, token).subscribe({
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
    if (this.vehicles.length > 0) {
      if (
        !this.selectedVehicleId ||
        !this.vehicles.some((v) => v.id === this.selectedVehicleId)
      ) {
        this.selectVehicle(this.vehicles[0].id)
      }
    }
  }
}
