import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
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
  AlternateLogoPath: string
  CarIconPath: string

  constructor(
    private router: Router,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {
    this.AlternateLogoPath = '/assets/logo-alternate2.png'
    this.CarIconPath = '/assets/car-icon.png'
  }

  userData: userDataSessionStorage | null = null

  ngOnInit(): void {
    // this.getUserData()
    this.cd.detectChanges()
  }

  getUserData() {
    // this.userData = this.dataService.getUserData()
    console.log('User data:', this.userData, 'userData no navabar')
    return
  }

  loginPath = ''

  goToProfile() {
    this.router.navigate(['profile'])
  }

  logout() {
    this.dataService.logout()
    this.router.navigate([this.loginPath])
  }
}
