import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  mostrarMenu = false;

  constructor(private router: Router) {}

  openMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  goHome() {
    this.router.navigate(['']);
  }
}
