import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { Observable } from 'rxjs'
import { DataService, VehicleBrand } from '../../services/data.service'
import { InputTextComponent } from '../input-text/input-text.component'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    InputTextComponent,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  myControl = new FormControl()
  filteredOptions: Observable<string[]>
  vehicleBrands: VehicleBrand[] = []
  brand = ''

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getVehicleBrands().subscribe({
      next: (brands) => {
        this.vehicleBrands = brands
        console.log('Marcas getadas: ', brands)
        this.filteredOptions = this.filterBrands('')
      },
      error: (err) => console.error('Erro ao pegar marcas', err),
    })
  }

  private filterBrands(value: string): Observable<string[]> {
    return this.dataService.filterBrands(value)
  }
}
