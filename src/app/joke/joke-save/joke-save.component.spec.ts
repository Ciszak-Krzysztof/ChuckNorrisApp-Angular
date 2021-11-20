import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeSaveComponent } from './joke-save.component';

describe('JokeSaveComponent', () => {
  let component: JokeSaveComponent;
  let fixture: ComponentFixture<JokeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
