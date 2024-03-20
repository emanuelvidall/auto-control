import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-account-created-successfully',
  standalone: true,
  imports: [],
  templateUrl: './account-created-successfully.component.html',
  styleUrl: './account-created-successfully.component.scss',
})
export class AccountCreatedSuccessfullyComponent implements OnInit {
  constructor(private router: Router) {}

  loginPath: string = '/'

  ngOnInit(): void {
    setTimeout(() => this.router.navigate([this.loginPath]), 3500)
  }

  AlternateLogoPath: string = 'assets/logo-alternate.png'
}
