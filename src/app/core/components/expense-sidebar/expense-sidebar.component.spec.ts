import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSidebarComponent } from './expense-sidebar.component';

describe('ExpenseSidebarComponent', () => {
  let component: ExpenseSidebarComponent;
  let fixture: ComponentFixture<ExpenseSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
