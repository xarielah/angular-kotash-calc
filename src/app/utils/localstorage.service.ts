import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: Storage = localStorage;
  private rateKey: string = 'last-rate';
  private consumptionKey: string = 'last-consumption';

  getLastRate(): number {
    const num = this.storage.getItem(this.rateKey);
    if (!num || isNaN(+num)) {
      return 0;
    }
    return +num;
  }

  setLastRate(rate: number): void {
    if (!Number.isNaN(+rate)) {
      this.storage.setItem(this.rateKey, rate.toString());
    }
  }

  getLastConsumption(): number {
    const num = this.storage.getItem(this.consumptionKey);
    if (!num || isNaN(+num)) {
      return 0;
    }
    return +num;
  }

  setLastConsumption(consumption: number): void {
    if (!Number.isNaN(+consumption)) {
      this.storage.setItem(this.consumptionKey, consumption.toString());
    }
  }
}
