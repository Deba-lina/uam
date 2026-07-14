import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemManagement } from './oem-management';

describe('OemManagement', () => {
  let component: OemManagement;
  let fixture: ComponentFixture<OemManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OemManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(OemManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
