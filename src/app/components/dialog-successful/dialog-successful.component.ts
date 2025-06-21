import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-successful',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './dialog-successful.component.html',
  styleUrl: './dialog-successful.component.css',
})
export class DialogSuccessfulComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<DialogSuccessfulComponent>
  ) {}

  goHome() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
