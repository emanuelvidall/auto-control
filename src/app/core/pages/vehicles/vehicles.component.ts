import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DataService, Vehicle } from '../../services/data.service'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../components/dialog/dialog.component'
import { Subscription, firstValueFrom, BehaviorSubject } from 'rxjs'
import { EnvironmentService } from '../../services/environmentService/environment-service.service'
import { ExpenseDialogComponent } from '../../components/expense-dialog/expense-dialog.component'

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehiclesComponentComponent, NavbarComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements OnInit, OnDestroy {
  userId: number = 0
  userToken: string = ''
  userName: string = ''
  vehicles: Vehicle[] = []
  loading: boolean = false

  private dialogSubscription: Subscription | null = null

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private envService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.envService.runInBrowser(() => {
      this.initializeData().then(() => {
        console.log('Dados finais após carregamento (pronto para o componente filho):', {
          userId: this.userId,
          userToken: this.userToken,
          userName: this.userName,
          vehicles: this.vehicles,
        });
      });
    });
  }
  

  ngOnDestroy(): void {
    this.dialogSubscription?.unsubscribe()
  }

  async initializeData(): Promise<void> {
    this.loading = true;
    try {
      console.log('Iniciando a carga dos dados');
      await this.loadUserData();
      console.log('Dados do usuário carregados:', this.userId, this.userToken, this.userName);
      await this.loadVehicles();
      console.log('Veículos carregados no componente pai:', this.vehicles);
  
      // Atualize a flag para liberar a renderização
      this.loading = false;
    } catch (error) {
      console.error('Erro ao tentar inicializar dados: ', error);
      this.loading = false;
    }
  }

  private async loadUserData(): Promise<void> {
    try {
      // Garantir que o getUserData está retornando dados válidos
      const userData = await firstValueFrom(this.dataService.getUserData());
      
      if (!userData) {
        console.error('Dados do usuário não encontrados.');
        return;
      }
  
      this.userId = userData?.user_id ?? 0;
      this.userToken = userData?.token ?? '';
      this.userName = userData?.user_name ?? '';
  
      console.log('Dados do usuário carregados com sucesso: ', userData);
    } catch (error) {
      console.error('Erro ao tentar carregar dados do usuário: ', error);
      // Aqui você pode lançar o erro ou tratá-lo conforme necessário
      throw error;
    }
  }
  

  private async loadVehicles(): Promise<void> {
    try {
      const vehiclesData = await firstValueFrom(
        this.dataService.getVehicleByOwner(this.userId, this.userToken)
      );
      console.log('Veículos carregados no componente pai: ', vehiclesData);  // Verifique aqui
      this.vehicles = vehiclesData;
      console.log('Veículos atribuídos à variável no componente pai: ', this.vehicles);
    } catch (error) {
      console.error('Erro ao tentar carregar veículos: ', error);
      throw error;
    }
  }
  

  public openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        userToken: this.userToken,
        userId: this.userId,
      },
    })

    this.dialogSubscription =
      dialogRef.componentInstance.vehicleAdded.subscribe(
        (newVehicle: Vehicle) => {
          this.addVehicle(newVehicle)
        }
      )
  }

  private addVehicle(newVehicle: Vehicle): void {
    this.vehicles = [...this.vehicles, newVehicle]
  }
}
