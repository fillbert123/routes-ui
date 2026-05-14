import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureHeaderComponent } from './figure-header.component';

describe('FigureHeaderComponent', () => {
  let component: FigureHeaderComponent;
  let fixture: ComponentFixture<FigureHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigureHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
