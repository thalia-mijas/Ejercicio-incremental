import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProcessingComponent } from './dialog-processing.component';

describe('DialogProcessingComponent', () => {
  let component: DialogProcessingComponent;
  let fixture: ComponentFixture<DialogProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProcessingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
