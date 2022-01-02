import { SitePlugin } from './_plugin';

export class Switcher extends SitePlugin {
    constructor() {
        super();
    }

    public init(): void {
        console.log('switcher alive');
    }
}
