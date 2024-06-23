import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAddEmployeeComponent } from './ui-add-employee.component';

describe('UiAddEmployeeComponent', () => {
  let component: UiAddEmployeeComponent;
  let fixture: ComponentFixture<UiAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAddEmployeeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
