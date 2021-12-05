import { TimerConfetti } from './confetti.model';

export interface TargetTimer {
    date: string;
    specialNumber?: number;
    specialNumberConfetti?: TimerConfetti;
    successText: string;
    successConfetti?: TimerConfetti;
}
