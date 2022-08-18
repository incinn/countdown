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

    if (timer.years > 0 || timer.years < -0.1) output += this.formatSegment(timer.years, 'year');
    if (timer.months > 0 || timer.months < -0.1)
      output += this.formatSegment(timer.months, 'month');
    if (timer.days > 0 || timer.days < -0.1) output += this.formatSegment(timer.days, 'day');
    if (timer.hours > 0 || timer.hours < -0.1) output += this.formatSegment(timer.hours, 'hour');
    output += this.formatSegment(timer.minutes, 'minute');
    output += this.formatSegment(timer.seconds, 'second');

    if (this.isSuccess(timer)) {
      output += `<div class="segment">ago</div>`;
      this.handleSuccess();
    }

    this.countdownEl.innerHTML = output.trim();
  }

  private isSuccess(timer: CountdownTimer): boolean {
    console.log('success mins', timer.minutes);
    console.log('success seconds', timer.seconds);
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

  private formatSegment(time: number, text: string): string {
    time = Math.abs(time);
    let output = '<div class="segment">';

    if (time != 1) text += 's';

    if (time === this.data.specialNumber) {
      output += `<span class="highlight">${time}</span> `;
      this.confetti.addConfetti(this.data.specialNumberConfetti);
    } else output += `${time} `;

    output += `<span class="text">${text}</span></div>`;

    return output;
  }
}
