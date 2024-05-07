import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private router: Router) {}
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  CarIconPath: string = 'assets/car-icon.png'

  loginPath = ''

  logout() {
    sessionStorage.removeItem('userData')
    this.router.navigate([this.loginPath])
  }
}
