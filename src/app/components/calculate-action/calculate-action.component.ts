import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RatesService } from '../../rates.service';

@Component({
  selector: 'app-calculate-action',
  templateUrl: 'calculate-action.component.html',
  standalone: true,
  imports: [NgIf],
})
export class CalculateActionComponent {
  private ratesService = inject(RatesService);
  @Input({ required: true }) disabled!: boolean;
  clicked = false;

  calculate(): void {
    this.clicked = true;
    this.ratesService.calculateCost();
  }
}
