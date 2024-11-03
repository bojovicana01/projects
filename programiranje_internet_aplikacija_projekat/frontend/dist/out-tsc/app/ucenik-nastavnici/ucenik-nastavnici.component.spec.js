import { TestBed } from '@angular/core/testing';
import { UcenikNastavniciComponent } from './ucenik-nastavnici.component';
describe('UcenikNastavniciComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UcenikNastavniciComponent]
        });
        fixture = TestBed.createComponent(UcenikNastavniciComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ucenik-nastavnici.component.spec.js.map