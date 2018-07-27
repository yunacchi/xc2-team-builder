import { TestBed, inject, async } from '@angular/core/testing';

import { DbRepositoryService } from './db-repository.service';
import { HttpClientModule } from '@angular/common/http';
import { first, withLatestFrom, filter, map } from 'rxjs/operators';

describe('DbRepositoryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
            providers: [
                DbRepositoryService 
            ]
        });
    });

    it('should be created', inject([DbRepositoryService], (service: DbRepositoryService) => {
        expect(service).toBeTruthy();
    }));

    it('should load DB store not empty', async(inject([DbRepositoryService], (service: DbRepositoryService) => {
        service.dbStore$.pipe(
            withLatestFrom(service.loading$),
            filter(([_, loading]) => !loading),
            map(([store, _]) => store),
            first()
        ).subscribe(s => {
            expect(s).toBeDefined();
            expect(s.blades.length).toBeGreaterThan(0);
            expect(s.drivers.length).toBe(5);
            expect(s.weapons.length).toBeGreaterThan(0);
        })
    })));
});
