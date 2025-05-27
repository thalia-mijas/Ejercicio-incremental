import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  mostrarMenu = false;

  openMenu() {
    console.log('open menu');
    this.mostrarMenu = !this.mostrarMenu;
  }
}
