import { TestBed } from '@angular/core/testing';
import { NastavnikService } from './nastavnik.service';
describe('NastavnikService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NastavnikService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=nastavnik.service.spec.js.map