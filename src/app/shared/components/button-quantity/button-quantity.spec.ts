import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCount } from './button-count';

describe('ButtonCount', () => {
  let component: ButtonCount;
  let fixture: ComponentFixture<ButtonCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
