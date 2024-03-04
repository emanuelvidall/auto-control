import { Component } from '@angular/core';
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [SubmitButtonComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
logoPath: string = 'assets/logo.png'
  AlternateLogoPath: string = 'assets/logo-alternate.png'
  eyeOn: string = 'assets/eye.svg'



  handleCreateAccount(){
    console.log('account created!')
  }
}
