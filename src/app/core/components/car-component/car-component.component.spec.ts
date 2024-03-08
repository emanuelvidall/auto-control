import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarComponentComponent } from './car-component.component';

describe('CarComponentComponent', () => {
  let component: CarComponentComponent;
  let fixture: ComponentFixture<CarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
