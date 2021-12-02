export class SitePlugin {
    constructor() {}

    public init(): void {}

    public getDate(): string {
        return localStorage.getItem('targetDate');
    }
}
