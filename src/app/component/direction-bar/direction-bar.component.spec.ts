import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionBarComponent } from './direction-bar.component';

describe('DirectionBarComponent', () => {
  let component: DirectionBarComponent;
  let fixture: ComponentFixture<DirectionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
