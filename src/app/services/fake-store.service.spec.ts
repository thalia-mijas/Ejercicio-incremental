import { TestBed } from '@angular/core/testing';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { FakeStoreService } from './fake-store.service';

describe('FakeStoreService', () => {
  let service: FakeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())],
    });
    service = TestBed.inject(FakeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
