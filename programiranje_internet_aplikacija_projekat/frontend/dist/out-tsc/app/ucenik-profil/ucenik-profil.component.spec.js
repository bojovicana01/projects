import { TestBed } from '@angular/core/testing';
import { UcenikProfilComponent } from './ucenik-profil.component';
describe('UcenikProfilComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UcenikProfilComponent]
        });
        fixture = TestBed.createComponent(UcenikProfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ucenik-profil.component.spec.js.map