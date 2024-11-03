import { TestBed } from '@angular/core/testing';
import { UniversalService } from './universal.service';
describe('UniversalService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UniversalService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=universal.service.spec.js.map