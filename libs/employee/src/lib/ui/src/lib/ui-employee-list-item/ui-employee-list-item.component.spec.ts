import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListItemComponent } from './ui-employee-list-item.component';

describe('EmployeeListItemComponent', () => {
  let component: EmployeeListItemComponent;
  let fixture: ComponentFixture<EmployeeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
