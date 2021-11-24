import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeImageComponent } from './joke-image.component';

describe('JokeImageComponent', () => {
  let component: JokeImageComponent;
  let fixture: ComponentFixture<JokeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
