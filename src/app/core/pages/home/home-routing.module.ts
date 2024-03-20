import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from '../login/login.component'
import { CreateAccountComponent } from '../create-account/create-account.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { AccountCreatedSuccessfullyComponent } from '../account-created-successfully/account-created-successfully.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
    component: DashboardComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
