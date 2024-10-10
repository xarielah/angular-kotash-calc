import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatesService } from '../../rates.service';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';
import { EditComponent } from '../../shared/icons/edit.component';

@Component({
  selector: 'app-consumption-input',
  templateUrl: './consumption-input.component.html',
  standalone: true,
  imports: [FormsModule, EditComponent, NgIf, FieldErrorComponent],
})
export class ConsumptionInputComponent {
  private ratesService = inject(RatesService);
  editConsumption = !this.ratesService.consumption;
  consumption = this.ratesService.consumption;
  editingExistingValue = false;

  saveConsumption(): void {
    this.ratesService.setConsumption(this.consumption);
    this.setEditConsumption(false);
  }

  setEditConsumption(value: boolean): void {
    this.editingExistingValue = true;
    this.editConsumption = value;
    this.consumption = '';
  }

  onCancelEditExisting() {
    this.setEditConsumption(false);
    this.consumption = this.ratesService.consumption;
  }

  get localeConsumption(): string {
    return parseFloat(this.ratesService.consumption).toLocaleString();
  }
}
