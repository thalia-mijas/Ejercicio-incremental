import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-successful',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatButtonModule],
  templateUrl: './dialog-successful.component.html',
  styleUrl: './dialog-successful.component.css',
})
export class DialogSuccessfulComponent {
  constructor(private router: Router) {}

  // onNoClick() {
  //   console.log('eliminar todo');
  // }

  // goHome() {
  //   this.router.navigate(['/'])
  // }
}
