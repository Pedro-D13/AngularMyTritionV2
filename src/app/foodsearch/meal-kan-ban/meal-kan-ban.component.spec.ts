import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MealKanBanComponent } from './meal-kan-ban.component';

describe('MealKanBanComponent', () => {
  let component: MealKanBanComponent;
  let fixture: ComponentFixture<MealKanBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealKanBanComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealKanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
