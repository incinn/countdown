import { EventBlock } from './_event';
import { SitePlugin } from './_plugin';
import { Switcher } from './_switcher';
import { Timer } from './_timer';
declare var __VERSION: string;

export class Site {
    private plugins: SitePlugin[] = [
        new Timer(),
        new EventBlock(),
        new Switcher(),
    ];
    private versionEl: HTMLElement = document.getElementById('version');

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
        this.displayVersion();
        this.startPlugins();

        console.info('View source: https://github.com/incinn/countdown');
    }

    private startPlugins(): void {
        this.plugins.forEach((plugin: SitePlugin) => plugin.init());
    }

    private displayVersion(): void {
        this.versionEl.innerHTML = 'v' + __VERSION;
    }
}
