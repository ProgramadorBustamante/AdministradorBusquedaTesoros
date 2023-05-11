import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesorosComponent } from './tesoros.component';

describe('TesorosComponent', () => {
  let component: TesorosComponent;
  let fixture: ComponentFixture<TesorosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesorosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesorosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
