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
import { DataService } from '../../services/data.service'

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
  submitted: boolean = false
  logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'
  showEye: boolean = false
  showPassword: boolean = false
  isLoading: boolean = false
  date: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
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
      password: ['', Validators.required, Validators.minLength(8)],
    })
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
    console.log(this.registerForm.value, 'valor do form')
    this.dataService
      .createAccount(this.registerForm.value)
      .subscribe((response) => {
        console.log(response)
      })
    {
      this.clearForm()
    }
    if (this.registerForm.invalid) {
      return
    }
  }
}
