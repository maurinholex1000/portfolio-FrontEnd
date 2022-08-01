import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardAndSkillsComponent } from './hard-and-skills.component';

describe('HardAndSkillsComponent', () => {
  let component: HardAndSkillsComponent;
  let fixture: ComponentFixture<HardAndSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardAndSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardAndSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
