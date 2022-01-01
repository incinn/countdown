import { timers } from '../data/_timers.data';
import { TargetTimer } from '../models/targetTimer.model';
import { EventBlock } from './_event';
import { SitePlugin } from './_plugin';
import { Timer } from './_timer';
declare var __VERSION: string;

export class Site {
    private plugins: SitePlugin[] = [new Timer(), new EventBlock()];
    private versionEl: HTMLElement = document.getElementById('version');
    private timers: TargetTimer[] = [];

    constructor() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
        } catch (e) {
            this.init = () => {};
            console.error('LocalStorage unavailable');
        }
    }

    public init(): void {
        this.timers = timers;
        this.displayVersion();
        this.setStorage(this.timers[0]);

        this.startPlugins();

        console.info('View source: https://github.com/incinn/countdown');
    }

    private startPlugins(): void {
        this.plugins.forEach((plugin: SitePlugin) => plugin.init());
    }

    private displayVersion(): void {
        this.versionEl.innerHTML = 'v' + __VERSION;
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
