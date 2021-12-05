import { EventBlock } from './_event';
import { SitePlugin } from './_plugin';
import { Timer } from './_timer';
declare var __VERSION: string;

export class Site {
    private plugins: SitePlugin[] = [new Timer(), new EventBlock()];
    private versionEl: HTMLElement = document.getElementById('version');

    constructor() {}

    public init(): void {
        this.displayVersion();
        this.setDate();

        this.startPlugins();

        console.info('View source: https://github.com/incinn/countdown');
    }

    private startPlugins(): void {
        this.plugins.forEach((plugin: SitePlugin) => plugin.init());
    }

    private displayVersion(): void {
        this.versionEl.innerHTML = 'v' + __VERSION;
    }

    private setDate(): void {
        localStorage.setItem('targetDate', '29 December 2021 12:05 UTC+1');
    }
}
