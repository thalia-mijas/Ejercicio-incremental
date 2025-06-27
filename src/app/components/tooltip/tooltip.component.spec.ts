import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-toolbar', () => {
    const fixture = TestBed.createComponent(TooltipComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(TooltipComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement?.getAttribute('src')).toBe('../baul.svg');
  });

  it('should show title if not in home route', () => {
    // Simula una ruta que no es '/'
    spyOnProperty(router, 'url', 'get').and.returnValue('/login');
    fixture.detectChanges();

    const titleSpan = fixture.debugElement.query(By.css('.title'));
    expect(titleSpan).toBeTruthy();
    expect(titleSpan.nativeElement.textContent).toContain('BAÚL DIGITAL');
  });

  it('should hide title if in home route', () => {
    // Simula la ruta de inicio
    spyOnProperty(router, 'url', 'get').and.returnValue('/');
    fixture.detectChanges();

    const titleSpan = fixture.debugElement.query(By.css('.title'));
    expect(titleSpan).toBeFalsy();
  });
});
