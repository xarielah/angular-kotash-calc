import { Component, inject } from '@angular/core';
import { CalculateActionComponent } from './components/calculate-action/calculate-action.component';
import { ConsumptionInputComponent } from './components/consumption-input/consumption-input.component';
import { ElectricIconComponent } from './components/icon/electric-icon.compnonent';
import { RateInputComponent } from './components/rate-input/rate-input.component';
import { RatesService } from './rates.service';
import { NoticeComponent } from './shared/notice/notice.component';
import { LocalStorageService } from './utils/localstorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NoticeComponent,
    ConsumptionInputComponent,
    RateInputComponent,
    CalculateActionComponent,
    ElectricIconComponent,
  ],
  providers: [LocalStorageService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private ratesService = inject(RatesService);
  validRate = false;
  validConsumption = false;

  setRateValidity(val: boolean) {
    this.validRate = val;
  }

  setConsumptionValidity(val: boolean) {
    this.validConsumption = val;
  }

  get bothInputsAreValid() {
    return this.validConsumption && this.validRate;
  }

  get totalCost() {
    return parseFloat(this.ratesService.totalCost.toFixed(2)).toLocaleString();
  }
}
