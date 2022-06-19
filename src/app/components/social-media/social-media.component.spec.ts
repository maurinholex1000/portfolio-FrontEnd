import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMEDIAComponent } from './social-media.component';

describe('SocialMEDIAComponent', () => {
  let component: SocialMEDIAComponent;
  let fixture: ComponentFixture<SocialMEDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMEDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMEDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
