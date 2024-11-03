import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajNastavnikaComponent } from './azuriraj-nastavnika.component';

describe('AzurirajNastavnikaComponent', () => {
  let component: AzurirajNastavnikaComponent;
  let fixture: ComponentFixture<AzurirajNastavnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajNastavnikaComponent]
    });
    fixture = TestBed.createComponent(AzurirajNastavnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
