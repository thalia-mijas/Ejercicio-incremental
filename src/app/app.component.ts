import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipComponent, FooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ejercicio-incremental';
}
