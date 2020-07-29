import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  tick,
  fakeAsync,
} from "@angular/core/testing";

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { KanBanBoardComponent } from "../kan-ban-board/kan-ban-board.component";
import { of } from "rxjs";

describe("KanBanBoardComponent", () => {
  let component: KanBanBoardComponent;
  let fixture: ComponentFixture<KanBanBoardComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KanBanBoardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanBanBoardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  fixture.detectChanges();

  it("should create", () => {
    expect(component).toBeTruthy;
  });
});
