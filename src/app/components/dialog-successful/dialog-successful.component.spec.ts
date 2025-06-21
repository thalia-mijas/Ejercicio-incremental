import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessfulComponent } from './dialog-successful.component';

describe('DialogSuccessfulComponent', () => {
  let component: DialogSuccessfulComponent;
  let fixture: ComponentFixture<DialogSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
