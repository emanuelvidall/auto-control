import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesComponentComponent } from './vehicles-component.component';

describe('VehiclesComponentComponent', () => {
  let component: VehiclesComponentComponent;
  let fixture: ComponentFixture<VehiclesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
