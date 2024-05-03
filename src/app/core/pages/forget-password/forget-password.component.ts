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
  selector: 'app-forget-password',
  standalone: true,
  imports: [SubmitButtonComponent, ReactiveFormsModule, CommonModule, NgIf, FormsModule,SubmitButtonComponent,],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup = new FormGroup({})
  submitted: boolean = false
  logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'
  showEye: boolean = false
  showPassword: boolean = false
  isLoading: boolean = false
  date: string = ''
  successfullyPath: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    })
  }

  errorMessage: string = ''

  get f() {
    return this.forgetForm.controls
  }

  clearForm() {
    this.forgetForm.reset()
    this.submitted = false
  }

  handleForgetPassword() {
    this.isLoading = true
    this.submitted = true

    if (this.forgetForm.invalid) {
      this.isLoading = false
      return
    }

    this.dataService.forgetPassword(this.forgetForm.value).subscribe({
      next: (response) => {
        console.log('Response:', response)
        this.router.navigate([this.successfullyPath])
        this.clearForm()
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = 'Ops! Algo deu errado, tente novamente.'

        console.error('Error sending email:', error)
      },
    })
  }
}
