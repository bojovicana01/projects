import { TestBed } from '@angular/core/testing';
import { NastavnikProfilComponent } from './nastavnik-profil.component';
describe('NastavnikProfilComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NastavnikProfilComponent]
        });
        fixture = TestBed.createComponent(NastavnikProfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=nastavnik-profil.component.spec.js.map