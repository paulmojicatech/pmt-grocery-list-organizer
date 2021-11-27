import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsWeNeedPage } from './things-we-need.page';

describe('ThingsWeNeedComponent', () => {
  let component: ThingsWeNeedPage;
  let fixture: ComponentFixture<ThingsWeNeedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingsWeNeedPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsWeNeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
