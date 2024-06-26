import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms'
import { HttpClientModule, HttpResponseBase } from '@angular/common/http'
import { CommonModule, NgIf } from '@angular/common'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { Router } from '@angular/router'
import { DataService, UserLoginData } from '../../services/data.service'
import { catchError, first, throwError } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgIf,
    FormsModule,
    SubmitButtonComponent,
    HttpClientModule,
  ],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  submitted = false
  data: any
  email: string = ''
  password: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    })
  }

  get f() {
    return this.registerForm.controls
  }

  carImagePath: string = 'assets/car.webp'
  logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'
  eyeOff: string = 'assets/eye-off.svg'
  isLoading: boolean = false
  showEye: boolean = false
  showPassword: boolean = false
  createAccountPath: string = 'create-account'
  forgetPasswordPath: string = 'forget-password'
  dashboardPath: string = 'dashboard'
  loginButton: boolean = true
  validCredentials: boolean = true

  toggleEye() {
    this.showEye = !this.showEye
    this.showPassword = !this.showPassword
  }

  clearForm() {
    this.registerForm.reset()
    this.submitted = false
  }

  goToCreateAccount() {
    this.router.navigate([this.createAccountPath])
  }

  goToForgetPassword() {
    this.router.navigate([this.forgetPasswordPath])
  }

  submitLogin() {
    this.isLoading = true
    const userData: UserLoginData = {
      username: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }
    this.submitted = true
    if (this.registerForm.invalid) {
      this.isLoading = false
      return
    }
    this.dataService
      .login(userData)
      .pipe(
        first(),
        catchError((error: any) => {
          this.isLoading = false
          const message =
            error?.error?.username || error?.error?.password
              ? 'Email ou senha inválidos'
              : 'Something bad happened; please try again later.'
          this.registerForm.get('email')?.setErrors({ customError: message })
          return throwError(() => error)
        })
      )
      .subscribe({
        next: (result) => {
          this.data = result
          console.log(result)
          setTimeout(() => {
            this.router.navigate([this.dashboardPath])
            this.isLoading = false
          }, 1000)
        },
        error: (error) => {
          console.error('Failed to log in:', error)
        },
      })
  }
}
