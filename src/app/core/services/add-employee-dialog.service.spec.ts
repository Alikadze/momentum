import { TestBed } from '@angular/core/testing';

import { AddEmployeeDialogService } from './add-employee-dialog.service';

describe('AddEmployeeDialogService', () => {
  let service: AddEmployeeDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEmployeeDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
