import {Component} from '@angular/core';

export class LoadingPage {
    public loading: boolean;
    constructor(val: boolean) {
        this.loading = val;
    }
    standby() {
        this.loading = true;
    }
    ready() {
        this.loading = false;
    }
}

@Component({
    selector: 'loading-indicator',
    templateUrl: './loading'
})
export class LoadingIndicator {}