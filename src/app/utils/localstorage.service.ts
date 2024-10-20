import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: Storage = localStorage;
  private rateKey: string = 'last-rate';
  private consumptionKey: string = 'last-consumption';

  isNumber(value: string | null): boolean {
    return !!value && !isNaN(parseFloat(value)) && value.trim() !== '';
  }

  getLastRate(): string {
    const num = this.storage.getItem(this.rateKey);
    if (!this.isNumber(num)) {
      return '';
    }
    return num!;
  }

  getLastConsumption(): string {
    const stringConsumption = this.storage.getItem(this.consumptionKey);
    if (!this.isNumber(stringConsumption)) {
      return '';
    }
    return stringConsumption!;
  }

  setLastRate(rate: number | string): void {
    const stringRate = rate.toString();
    if (!this.isNumber(stringRate))
      throw new Error(`Invalid rate ${stringRate}`);
    this.storage.setItem(this.rateKey, rate.toString());
  }

  setLastConsumption(consumption: number | string): void {
    const stringConsumption = consumption.toString();
    if (!this.isNumber(stringConsumption))
      throw new Error(`Invalid consumption ${stringConsumption}`);
    this.storage.setItem(this.consumptionKey, stringConsumption);
  }
}
