import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBladesPageComponent } from './my-blades-page.component';

describe('MyBladesPageComponent', () => {
  let component: MyBladesPageComponent;
  let fixture: ComponentFixture<MyBladesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBladesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBladesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
