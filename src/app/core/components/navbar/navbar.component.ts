import { Component, OnInit } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Router } from '@angular/router'
import {
  DataService,
  userDataSessionStorage,
} from '../../services/data.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  userData: userDataSessionStorage | null = null

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.userData = this.dataService.getUserData()
    console.log('User data:', this.userData, 'userData no navabar')
    return
  }

  loginPath = ''

  goToProfile() {
    this.router.navigate(['profile'])
  }

  logout() {
    sessionStorage.removeItem('userData')
    this.router.navigate([this.loginPath])
  }

  AlternateLogoPath: string = 'assets/logo-alternate.png'
  CarIconPath: string = 'assets/car-icon.png'
}
