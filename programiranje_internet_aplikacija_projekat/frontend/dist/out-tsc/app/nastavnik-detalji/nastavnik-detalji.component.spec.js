import { TestBed } from '@angular/core/testing';
import { NastavnikDetaljiComponent } from './nastavnik-detalji.component';
describe('NastavnikDetaljiComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NastavnikDetaljiComponent]
        });
        fixture = TestBed.createComponent(NastavnikDetaljiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=nastavnik-detalji.component.spec.js.map