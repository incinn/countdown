import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import JSConfetti from 'js-confetti';
import { SitePlugin } from './_plugin';
import { TargetTimer } from '../models/targetTimer.model';

interface CountdownTimer {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export class Timer extends SitePlugin {
  private countdownEl: HTMLElement;
  private successTextEl: HTMLElement;
  private _timer: any;
  private confetti: JSConfetti;
  private data: TargetTimer;
  private successMode = false;

  constructor() {
    super();

    dayjs.extend(relativeTime);
    dayjs.extend(duration);

    this.countdownEl = document.getElementById('timer');
    this.successTextEl = document.getElementById('successText');
    this.confetti = new JSConfetti();

    if (!this.countdownEl || !this.successTextEl || !this.confetti) {
      console.error('Unable to start timer');
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.init = () => { };
    }
  }

  public init(): void {
    this.successMode = false;
    this.data = this.getTimerData();

    this._timer = setInterval(() => this.updateTimer(), 1000);
    this.updateTimer();
  }

  public rebuild(): void {
    clearInterval(this._timer);
    this.successMode = false;
    this.successTextEl.innerHTML = '';
    this.init();
  }

  private updateTimer(): void {
    const timer = this.calculate(this.data.date);

    let output = '';

    if (timer.years > 0 || timer.years < 0) output += this.timerSegment(timer.years, 'year');
    if (timer.months > 0 || timer.months < 0)
      output += this.timerSegment(timer.months, 'month');
    if (timer.days > 0 || timer.days < 0) output += this.timerSegment(timer.days, 'day');
    if (timer.hours > 0 || timer.hours < 0) output += this.timerSegment(timer.hours, 'hour');
    
    output += this.timerSegment(timer.minutes, 'minute');
    output += this.timerSegment(timer.seconds, 'second');

    if (this.isSuccess(timer)) {
      output += this.segmentEl('ago');
      this.handleSuccess();
    }

    this.countdownEl.innerHTML = output.trim();
  }

  private isSuccess(timer: CountdownTimer): boolean {
    return timer.minutes <= 0 && timer.seconds < 0;
  }

  private handleSuccess(): void {
    this.confetti.addConfetti(this.data.successConfetti);

    if (!this.successMode) {
      this.successTextEl.innerHTML = this.data.successText;
      this.successMode = true;
    }
  }

  private calculate(target: string): CountdownTimer {
    const raw = dayjs
      .duration(dayjs(target).diff(dayjs()))
      .format('Y;M;D;H;m;s;');

    const data = raw.split(';');

    return {
      years: +data[0],
      months: +data[1],
      days: +data[2],
      hours: +data[3],
      minutes: +data[4],
      seconds: +data[5],
    };
  }

  private timerSegment(time: number, text: string): string {
    time = Math.abs(time);

    let out = this.segmentEl(time.toString());

    if (time != 1) text += 's';

    if (time === this.data.specialNumber) {
      this.confetti.addConfetti(this.data.specialNumberConfetti);
      return out + this.segmentEl(text, 'highlight');
    } else return out + this.segmentEl(text, 'text');
  }

  private segmentEl(text: string, className?: string): string {
    return `<div class="segment"><span class="${className}">${text}</span></div>`;
  }
}
