import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeDialogService {
    private openDialogSubject = new Subject<void>();
    private employeeAddedSubject = new Subject<void>();

    openDialog$ = this.openDialogSubject.asObservable();
    employeeAdded$ = this.employeeAddedSubject.asObservable();

    triggerOpenDialog() {
        this.openDialogSubject.next();
    }

    notifyEmployeeAdded() {
        this.employeeAddedSubject.next();
    }
}
