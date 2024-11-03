import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenjivanjeNastavnikaComponent } from './ocenjivanje-nastavnika.component';

describe('OcenjivanjeNastavnikaComponent', () => {
  let component: OcenjivanjeNastavnikaComponent;
  let fixture: ComponentFixture<OcenjivanjeNastavnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcenjivanjeNastavnikaComponent]
    });
    fixture = TestBed.createComponent(OcenjivanjeNastavnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
