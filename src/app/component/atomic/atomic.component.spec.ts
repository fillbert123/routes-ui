import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicComponent } from './atomic.component';

describe('AtomicComponent', () => {
  let component: AtomicComponent;
  let fixture: ComponentFixture<AtomicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtomicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
