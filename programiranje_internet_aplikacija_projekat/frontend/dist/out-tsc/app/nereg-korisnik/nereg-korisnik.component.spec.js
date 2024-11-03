import { TestBed } from '@angular/core/testing';
import { NeregKorisnikComponent } from './nereg-korisnik.component';
describe('NeregKorisnikComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NeregKorisnikComponent]
        });
        fixture = TestBed.createComponent(NeregKorisnikComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=nereg-korisnik.component.spec.js.map