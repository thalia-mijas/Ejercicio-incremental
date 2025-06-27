import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogSuccessfulComponent } from './dialog-successful.component';

describe('DialogSuccessfulComponent', () => {
  let component: DialogSuccessfulComponent;
  let fixture: ComponentFixture<DialogSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSuccessfulComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // mock vacío
        { provide: MAT_DIALOG_DATA, useValue: {} }, // puedes simular datos si los usa
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
