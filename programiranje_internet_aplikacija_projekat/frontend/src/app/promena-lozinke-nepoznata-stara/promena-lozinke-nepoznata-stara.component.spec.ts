import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeNepoznataStaraComponent } from './promena-lozinke-nepoznata-stara.component';

describe('PromenaLozinkeNepoznataStaraComponent', () => {
  let component: PromenaLozinkeNepoznataStaraComponent;
  let fixture: ComponentFixture<PromenaLozinkeNepoznataStaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkeNepoznataStaraComponent]
    });
    fixture = TestBed.createComponent(PromenaLozinkeNepoznataStaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
