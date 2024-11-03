import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojUcenikDetaljiComponent } from './moj-ucenik-detalji.component';

describe('MojUcenikDetaljiComponent', () => {
  let component: MojUcenikDetaljiComponent;
  let fixture: ComponentFixture<MojUcenikDetaljiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MojUcenikDetaljiComponent]
    });
    fixture = TestBed.createComponent(MojUcenikDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
