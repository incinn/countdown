/* eslint-disable @typescript-eslint/no-empty-function */
import { TimerConfetti } from '../models/confetti.model';
import { TargetTimer } from '../models/targetTimer.model';

export class SitePlugin {
    constructor() {
        document.addEventListener('changedTimer', () => this.rebuild());
    }

    public init(): void {}

    public rebuild(): void {}

    public getDate(): string {
        return localStorage.getItem('targetDate');
    }

    public getTimerData(): TargetTimer {
        return {
            date: this.getDate(),
            description: localStorage.getItem('descriptionText'),
            menuText: localStorage.getItem('menuText'),
            specialNumber: parseInt(localStorage.getItem('specialNumber')),
            specialNumberConfetti: JSON.parse(
                localStorage.getItem('specialNumberConfetti')
            ) as TimerConfetti,
            successText: localStorage.getItem('successText'),
            successConfetti: JSON.parse(
                localStorage.getItem('successConfetti')
            ) as TimerConfetti,
        };
    }
}
