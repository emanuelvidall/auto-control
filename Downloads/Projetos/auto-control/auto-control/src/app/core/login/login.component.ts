import { Component } from '@angular/core';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SubmitButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  carImagePath: string = 'assets/car.jpg';
  logoPath: string = 'assets/logo.png';
  AlternateLogoPath: string = 'assets/logo-alternate.png'
}
