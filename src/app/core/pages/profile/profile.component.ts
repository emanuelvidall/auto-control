import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DataService } from '../../services/data.service'

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
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  userData: any

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cnh: [''],
    })
  }

  ngOnInit() {
    this.getUserData()
  }

  getUserData() {
    this.dataService.getUserData().subscribe(
      (data) => {
        console.log('aqui paizao', data); // Agora data terá os valores reais
        this.userData = data;
        if (data) {
          this.profileForm.setValue({
            name: data.user_name || '',
            email: data.email || '',
            cnh: data.user_cnh || '',
          });
        }
      },
      (error) => {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    );
  }
  

  updateProfile() {
    if (this.profileForm.valid) {
      this.dataService
        .updateUserData(this.profileForm.value, this.userData.user_id)
        .subscribe({
          next: (response) => console.log('Profile updated', response),
          error: (error) => console.error('Error updating profile', error),
        })
    }
  }

  // Depois de fazer o update da informacão, temos que atualizar o LocalStorage com as informacões do usuário
}
