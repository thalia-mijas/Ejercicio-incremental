import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFailedComponent } from './dialog-failed.component';

describe('DialogFailedComponent', () => {
  let component: DialogFailedComponent;
  let fixture: ComponentFixture<DialogFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
