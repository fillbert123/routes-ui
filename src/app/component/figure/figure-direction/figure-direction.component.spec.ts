import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureDirectionComponent } from './figure-direction.component';

describe('FigureDirectionComponent', () => {
  let component: FigureDirectionComponent;
  let fixture: ComponentFixture<FigureDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigureDirectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigureDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
