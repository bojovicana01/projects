import { TestBed } from '@angular/core/testing';
import { UcenikService } from './ucenik.service';
describe('UcenikService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UcenikService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ucenik.service.spec.js.map