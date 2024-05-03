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
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-create-new-password',
  standalone: true,
  imports: [
    SubmitButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './create-new-password.component.html',
  styleUrl: './create-new-password.component.scss'
})
export class CreateNewPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup({})
  token!: string;
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
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      token: ['', Validators.required]
    })
    // Get the token from the URL
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
          this.token = params['token'];
          this.resetPasswordForm.get('token')?.setValue(this.token);
      },
      error: (err) => {
          console.error('Error retrieving queryParams:', err);
      }
  });
  }

  errorMessage: string = ''

  get f() {
    return this.resetPasswordForm.controls
  }

  clearForm() {
    this.resetPasswordForm.reset()
    this.submitted = false
  }

  toggleEye() {
    this.showEye = !this.showEye
    this.showPassword = !this.showPassword
  }

  handleNewPasswordAccount() {
    this.isLoading = true
    this.submitted = true

    if (this.resetPasswordForm.invalid) {
      this.isLoading = false
      return
    }

    this.dataService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (response) => {
        console.log('Password altered:', response)
        this.router.navigate([this.successfullyPath])
        this.clearForm()
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = 'Ops! Algo deu errado, tente novamente.'
        console.error('Error creating account:', error)
      },
    })
  }
}
