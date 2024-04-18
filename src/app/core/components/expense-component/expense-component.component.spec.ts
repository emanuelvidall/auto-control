import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseComponentComponent } from './expense-component.component';

describe('ExpenseComponentComponent', () => {
  let component: ExpenseComponentComponent;
  let fixture: ComponentFixture<ExpenseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
