import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from '../login/login.component'
import { CreateAccountComponent } from '../create-account/create-account.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { ForgetPasswordComponent } from '../forget-password/forget-password.component'
import { CreateNewPasswordComponent } from '../create-new-password/create-new-password.component'
import { AccountCreatedSuccessfullyComponent } from '../account-created-successfully/account-created-successfully.component'
import { ProfileComponent } from '../profile/profile.component'
import { ExpensesComponent } from '../expenses/expenses.component'
import { VehiclesComponent } from '../vehicles/vehicles.component'
import { SelectedVehiclesComponent } from '../selected-vehicles/selected-vehicles.component'

const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: 'account-created-successfully',
    component: AccountCreatedSuccessfullyComponent,
  },
  {
    path: 'dashboard',
    component: ExpensesComponent,
  },
  { path: 'dashboard/:vehicleId', component: DashboardComponent },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: CreateNewPasswordComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
  },
  {
    path: 'selected-vehicles/:vehicleId',
    component: DashboardComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
