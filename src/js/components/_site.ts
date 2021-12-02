import { EventBlock } from './_event';
import { SitePlugin } from './_plugin';
import { Timer } from './_timer';
declare var __VERSION: string;

export class Site {
    private plugins: SitePlugin[] = [new Timer(), new EventBlock()];
    private versionEl: HTMLElement = document.getElementById('version');

    constructor() {}

    public init(): void {
        this.plugins.forEach((plugin: SitePlugin) => plugin.init());

        this.displayVersion();
    }

    private displayVersion(): void {
        this.versionEl.innerHTML = 'v' + __VERSION;
    }
}
