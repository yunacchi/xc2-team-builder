import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPartyPageComponent } from './my-party-page.component';

describe('MyBladesPageComponent', () => {
  let component: MyPartyPageComponent;
  let fixture: ComponentFixture<MyPartyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPartyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPartyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
