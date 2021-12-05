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

    constructor() {}

    public init(): void {
        this.timers = timers;
        this.displayVersion();
        this.setDate(this.timers[0].date);

        this.startPlugins();

        console.info('View source: https://github.com/incinn/countdown');
    }

    private startPlugins(): void {
        this.plugins.forEach((plugin: SitePlugin) => plugin.init());
    }

    private displayVersion(): void {
        this.versionEl.innerHTML = 'v' + __VERSION;
    }

    private setDate(date: string): void {
        localStorage.setItem('targetDate', date);
    }
}
