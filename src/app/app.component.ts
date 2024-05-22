import { Component, LOCALE_ID } from '@angular/core'
import { RouterOutlet } from '@angular/router'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class AppComponent {
  title = 'auto-control'
}
