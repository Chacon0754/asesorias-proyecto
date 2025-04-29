import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostFormComponent } from './forum-post-form.component';

describe('ForumPostFormComponent', () => {
  let component: ForumPostFormComponent;
  let fixture: ComponentFixture<ForumPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumPostFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
