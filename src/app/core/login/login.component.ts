import { Component } from '@angular/core'
import { SubmitButtonComponent } from '../submit-button/submit-button.component'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SubmitButtonComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private http: HttpClient) {}

  carImagePath: string = 'assets/car.jpg'
  logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'
  eyeOff: string = 'assets/eye-off.svg'

  showEye: boolean = false
  showPassword: boolean = false

  userData = {
    email: '',
    password: '',
  }

  toggleEye() {
    this.showEye = !this.showEye
    this.showPassword = !this.showPassword
  }

  clearForm() {
    this.userData.email = ''
    this.userData.password = ''
  }

  submitLogin(f: NgForm) {
    const url = 'https://httpbin.org/post'
    this.http.post(url, this.userData).subscribe({
      next: (response) => {
        this.clearForm()
        console.log(response)
      },
      error: (error) => console.error(error),
    })
  }
}
