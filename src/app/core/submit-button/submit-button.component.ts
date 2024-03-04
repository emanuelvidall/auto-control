import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() buttonStyle: string = 'buttonStyle'
  @Input() buttonText: string = 'Botao'

  ngOnInit() { // Step 3: Add ngOnInit method
    // Log the input properties to the console
    console.log('Button Style:', this.buttonStyle);
    console.log('Button Text:', this.buttonText);
  }
}
