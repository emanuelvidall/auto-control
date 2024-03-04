import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { CommonModule, NgIf } from '@angular/common'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { Router } from '@angular/router'

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
  ],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  submitted = false

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {}

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

  carImagePath: string = 'assets/car.jpg'
  logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'
  eyeOff: string = 'assets/eye-off.svg'

  showEye: boolean = false
  showPassword: boolean = false

  createAccountPath: string = 'create-account'

  toggleEye() {
    this.showEye = !this.showEye
    this.showPassword = !this.showPassword
  }

  clearForm() {
    this.registerForm.reset()
    this.submitted = false
  }

  goToCreateAccount(){
    this.router.navigate([this.createAccountPath])
  }

  submitLogin() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    const url = 'https://httpbin.org/post'
    this.http.post(url, this.registerForm.value).subscribe({
      next: (response) => {
        this.clearForm()
        console.log(response)
      },
      error: (error) => console.error(error),
    })
  }
}
