import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureRouteComponent } from './figure-route.component';

describe('FigureRouteComponent', () => {
  let component: FigureRouteComponent;
  let fixture: ComponentFixture<FigureRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigureRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigureRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
