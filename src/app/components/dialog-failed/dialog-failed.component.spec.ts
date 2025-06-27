import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogFailedComponent } from './dialog-failed.component';

describe('DialogFailedComponent', () => {
  let component: DialogFailedComponent;
  let fixture: ComponentFixture<DialogFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFailedComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // mock vacío
        { provide: MAT_DIALOG_DATA, useValue: {} }, // puedes simular datos si los usa
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
