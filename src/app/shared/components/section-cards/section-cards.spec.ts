import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCards } from './section-cards';

describe('SectionCards', () => {
  let component: SectionCards;
  let fixture: ComponentFixture<SectionCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
