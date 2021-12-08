import { TimerConfetti } from '../models/confetti.model';
import { TargetTimer } from '../models/targetTimer.model';

export class SitePlugin {
    constructor() {}

    public init(): void {}

    public getDate(): string {
        return localStorage.getItem('targetDate');
    }

    public getTimerData(): TargetTimer {
        return {
            date: this.getDate(),
            specialNumber: parseInt(localStorage.getItem('specialNumber')),
            specialNumberConfetti: JSON.parse(
                localStorage.getItem('specialNumberConfetti')
            ) as TimerConfetti,
            successText: '',
            successConfetti: JSON.parse(
                localStorage.getItem('successConfetti')
            ) as TimerConfetti,
        };
    }
}
