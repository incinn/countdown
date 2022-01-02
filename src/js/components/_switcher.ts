import { timers } from '../data/_timers.data';
import { TargetTimer } from '../models/targetTimer.model';
import { SitePlugin } from './_plugin';

export class Switcher extends SitePlugin {
    private switcherListEl: HTMLUListElement;
    private timers: TargetTimer[];

    constructor() {
        super();

        this.timers = timers;
        this.switcherListEl = document.getElementById(
            'switcherList'
        ) as HTMLUListElement;

        if (!this.timers || !this.switcherListEl) {
            console.error('Cannot start switcher');
            this.init = () => {};
        }
    }

    public init(): void {
        this.setStorage(this.timers[0]);
    }

    private setStorage(timer: TargetTimer): void {
        localStorage.setItem('targetDate', timer.date);
        if (timer.specialNumber)
            localStorage.setItem('specialNumber', '' + timer.specialNumber);
        if (timer.specialNumberConfetti)
            localStorage.setItem(
                'specialNumberConfetti',
                JSON.stringify(timer.specialNumberConfetti)
            );
        localStorage.setItem('successText', timer.successText);
        localStorage.setItem(
            'successConfetti',
            JSON.stringify(timer.successConfetti)
        );
        localStorage.setItem('descriptionText', timer.description);
    }
}
