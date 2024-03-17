import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-base',
    template: '',
})
export class BaseComponent implements OnDestroy {
    protected destroyed$: Subject<void> = new Subject();

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
