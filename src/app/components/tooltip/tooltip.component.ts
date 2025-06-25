import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
  ],
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

  goLogin() {
    this.router.navigate(['login']);
  }

  goBasket() {
    this.router.navigate(['basket']);
  }

  get isHome(): boolean {
    return this.router.url === '/';
  }
}
