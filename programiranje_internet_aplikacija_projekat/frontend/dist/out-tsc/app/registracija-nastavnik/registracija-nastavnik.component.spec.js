import { TestBed } from '@angular/core/testing';
import { RegistracijaNastavnikComponent } from './registracija-nastavnik.component';
describe('RegistracijaNastavnikComponent', () => {
    let component;
    let fixture;
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
//# sourceMappingURL=registracija-nastavnik.component.spec.js.map