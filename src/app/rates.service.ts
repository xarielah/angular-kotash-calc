import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RatesService {
  private electricityRate: number = 0;
  private electricityConsumption: number = 0;
  totalCost: number = 0;

  calculateCost() {
    this.totalCost = (this.electricityRate * this.electricityConsumption) / 10;
  }

  setConsumption(value: string) {
    this.electricityConsumption = +value;
  }

  setRate(value: string) {
    this.electricityRate = +value;
  }

  get isValidForCalculation() {
    return this.electricityRate !== 0 && this.electricityConsumption !== 0;
  }

  get rate() {
    return this.electricityRate === 0 ? '' : this.electricityRate.toString();
  }

  get consumption() {
    return this.electricityConsumption === 0
      ? ''
      : this.electricityConsumption.toString();
  }
}
