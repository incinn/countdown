import { TimerConfetti } from './confetti.model';

export interface TargetTimer {
    date: string;
    menuText: string;
    description: string;
    specialNumber?: number;
    specialNumberConfetti?: TimerConfetti;
    successText: string;
    successConfetti?: TimerConfetti;
}
