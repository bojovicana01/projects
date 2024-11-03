import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkePoznataStaraComponent } from './promena-lozinke-poznata-stara.component';

describe('PromenaLozinkePoznataStaraComponent', () => {
  let component: PromenaLozinkePoznataStaraComponent;
  let fixture: ComponentFixture<PromenaLozinkePoznataStaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkePoznataStaraComponent]
    });
    fixture = TestBed.createComponent(PromenaLozinkePoznataStaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
