import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MenuItemDialogService {
    createDialogSubject = new Subject<boolean>()
    updateDialogSubject = new Subject<boolean>()

    openCreateDialog(){
        this.createDialogSubject.next(true)
    }

    closeCreateDialog(){
        this.createDialogSubject.next(false)
    }

    openUpdateDialog(){
        this.updateDialogSubject.next(true)
    }

    closeUpdateDialog(){
        this.updateDialogSubject.next(false)
    }
}