import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedVehiclesComponent } from './selected-vehicles.component';

describe('SelectedVehiclesComponent', () => {
  let component: SelectedVehiclesComponent;
  let fixture: ComponentFixture<SelectedVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
