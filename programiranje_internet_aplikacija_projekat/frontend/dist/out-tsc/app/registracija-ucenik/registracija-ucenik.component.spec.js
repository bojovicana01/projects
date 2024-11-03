import { TestBed } from '@angular/core/testing';
import { RegistracijaUcenikComponent } from './registracija-ucenik.component';
describe('RegistracijaUcenikComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegistracijaUcenikComponent]
        });
        fixture = TestBed.createComponent(RegistracijaUcenikComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registracija-ucenik.component.spec.js.map