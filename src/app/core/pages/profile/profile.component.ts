import { Component } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { MatButtonModule } from '@angular/material/button'
// import { MatIconModule } from '@angular/material/icon'
// import { Router } from '@angular/router'
// import {
//   DataService,
//   userDataSessionStorage,
// } from '../../services/data.service'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    // MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  // constructor(private router: Router, private dataService: DataService) {}
  // userData: userDataSessionStorage | null = null
  // getUserData() {
  //   this.userData = this.dataService.getUserData()
  //   console.log('User data:', this.userData, 'userData no navabar')
  //   return
  // }
}
