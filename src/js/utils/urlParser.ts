/*
  * Encode/Decode/(un)escape methods based on
  * https://github.com/joaquimserafim/base64-url
  *
  * Additional methods by Barnz (barnz.dev)
*/

import { TargetTimer } from "../models/targetTimer.model";
const Buffer = require('buffer/').Buffer;

export default class UrlParser {
  constructor() { }

  private _unescape(str: string): string {
    return (str + '==='.slice((str.length + 3) % 4))
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  }

  private _escape(str: string): string {
    return str.replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  public getTargetTimer(): TargetTimer | void {
    // valid: eyJkYXRlIjoiMjIgSnVuZSAyMDI0IDAwOjAwIiwiZGVzY3JpcHRpb24iOiJNWSBORVcgQ09VTlRET1dOISIsIm1lbnVUZXh0IjoiTVkgQ09VTlRET1dOIiwic3BlY2lhbE51bWJlciI6Niwic3BlY2lhbE51bWJlckNvbmZldHRpIjp7ImVtb2ppcyI6WyLimIDvuI8iLCLimIDvuI8iLCLwn4y7Iiwi8J-NuiJdLCJlbW9qaVNpemUiOjI1LCJjb25mZXR0aVJhZGl1cyI6MzAsImNvbmZldHRpTnVtYmVyIjo3fSwic3VjY2Vzc1RleHQiOiJMb25nZXN0IGRheSBvZiB0aGUgeWVhciEg4piA77iPIiwic3VjY2Vzc0NvbmZldHRpIjp7ImVtb2ppcyI6WyLimIDvuI8iLCLimIDvuI8iLCLwn4y7Iiwi8J-NuiJdLCJlbW9qaVNpemUiOjI1LCJjb25mZXR0aVJhZGl1cyI6MzAsImNvbmZldHRpTnVtYmVyIjo1MH19
    // invalid: eyJkZXNjcmlwdGlvbiI6Ik1ZIE5FVyBDT1VOVERPV04hIiwibWVudVRleHQiOiJNWSBDT1VOVERPV04iLCJzcGVjaWFsTnVtYmVyIjo2LCJzcGVjaWFsTnVtYmVyQ29uZmV0dGkiOnsiZW1vamlzIjpbIuKYgO-4jyIsIuKYgO-4jyIsIvCfjLsiLCLwn426Il0sImVtb2ppU2l6ZSI6MjUsImNvbmZldHRpUmFkaXVzIjozMCwiY29uZmV0dGlOdW1iZXIiOjd9LCJzdWNjZXNzVGV4dCI6Ikxvbmdlc3QgZGF5IG9mIHRoZSB5ZWFyISDimIDvuI8iLCJzdWNjZXNzQ29uZmV0dGkiOnsiZW1vamlzIjpbIuKYgO-4jyIsIuKYgO-4jyIsIvCfjLsiLCLwn426Il0sImVtb2ppU2l6ZSI6MjUsImNvbmZldHRpUmFkaXVzIjozMCwiY29uZmV0dGlOdW1iZXIiOjUwfX0
    const timerData = new URLSearchParams(window.location.search).get("t");
    if (!timerData) return;

    try {
      const parsedValue = JSON.parse(this.decode(timerData)) as TargetTimer;
      if (!this.verify(parsedValue)) throw "invalid TargetTimer provided";

      return parsedValue;
    } catch (e) {
      console.error('[PARSE ERROR]', e);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
  }

  public encode(str: string, encoding = 'utf8'): string {
    return this._escape(Buffer.from(str, encoding).toString('base64'));
  }

  public decode(str: string, encoding = 'utf8'): string {
    return Buffer.from(this._unescape(str), 'base64').toString(encoding);
  }

  public verify(obj: TargetTimer): boolean {
    const required = ['date', 'description', 'menuText', 'successText'];
    for (let i = 0; i < required.length; i++) {
      if (!obj.hasOwnProperty(required[i])) return false;
    }
    return true;
  }
}

