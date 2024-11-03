import { TestBed } from '@angular/core/testing';
import { NastavnikMojiUceniciComponent } from './nastavnik-moji-ucenici.component';
describe('NastavnikMojiUceniciComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NastavnikMojiUceniciComponent]
        });
        fixture = TestBed.createComponent(NastavnikMojiUceniciComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=nastavnik-moji-ucenici.component.spec.js.map