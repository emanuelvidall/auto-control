import { Component, OnInit } from '@angular/core'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { CommonModule, NgIf } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    SubmitButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
    FormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  submitted = false
  logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'
  showEye: boolean = false
  showPassword: boolean = false
  isLoading: boolean = false

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      driversLicense: ['', [Validators.required]],
      // password: [
      //   '',
      //   [Validators.minLength(8), this.passwordPatternValidator()],
      //   [Validators.required],
      // ],
      password: [
        '',
        Validators.required,
        Validators.minLength(8),
        this.passwordPatternValidator(),
      ],
    })
  }

  passwordPatternValidator(): Validators {
    return (control: FormControl): { [key: string]: any } | null => {
      const password = control.value
      console.log('entrei no validator')
      if (!password) {
        return null
      }
      const hasNumber = /[0-9]/.test(password)
      if (!hasNumber) {
        return { passwordNoNumber: true }
      }
      return null
    }
  }

  get f() {
    return this.registerForm.controls
  }

  clearForm() {
    this.registerForm.reset()
    this.submitted = false
  }

  toggleEye() {
    this.showEye = !this.showEye
    this.showPassword = !this.showPassword
  }

  handleCreateAccount() {
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
