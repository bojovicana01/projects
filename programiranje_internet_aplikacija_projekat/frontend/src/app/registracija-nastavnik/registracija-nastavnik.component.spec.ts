import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaNastavnikComponent } from './registracija-nastavnik.component';

describe('RegistracijaNastavnikComponent', () => {
  let component: RegistracijaNastavnikComponent;
  let fixture: ComponentFixture<RegistracijaNastavnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaNastavnikComponent]
    });
    fixture = TestBed.createComponent(RegistracijaNastavnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
