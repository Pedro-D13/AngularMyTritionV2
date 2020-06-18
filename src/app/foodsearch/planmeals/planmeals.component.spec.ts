import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanmealsComponent } from './planmeals.component';

describe('PlanmealsComponent', () => {
  let component: PlanmealsComponent;
  let fixture: ComponentFixture<PlanmealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanmealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanmealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
