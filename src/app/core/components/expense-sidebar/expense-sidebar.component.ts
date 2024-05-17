import { Component } from '@angular/core'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSliderModule } from '@angular/material/slider'
import { MatExpansionModule } from '@angular/material/expansion'

@Component({
  selector: 'app-expense-sidebar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatSliderModule,
    MatExpansionModule,
  ],
  templateUrl: './expense-sidebar.component.html',
  styleUrl: './expense-sidebar.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ExpenseSidebarComponent {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k'
    }

    return `${value}`
  }
  panelOpenState = false
}
