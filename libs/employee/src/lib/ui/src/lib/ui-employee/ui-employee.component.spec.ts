import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiEmployeeComponent } from './ui-employee.component';

describe('UiEmployeeComponent', () => {
  let component: UiEmployeeComponent;
  let fixture: ComponentFixture<UiEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiEmployeeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
