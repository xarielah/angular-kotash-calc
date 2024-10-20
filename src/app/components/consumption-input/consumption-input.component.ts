import { NgIf } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatesService } from '../../rates.service';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';
import { EditComponent } from '../../shared/icons/edit.component';
import { LocalStorageService } from '../../utils/localstorage.service';

@Component({
  selector: 'app-consumption-input',
  templateUrl: './consumption-input.component.html',
  standalone: true,
  imports: [FormsModule, EditComponent, NgIf, FieldErrorComponent],
})
export class ConsumptionInputComponent implements OnInit {
  private ratesService = inject(RatesService);
  private cacheService = inject(LocalStorageService);
  state = output<boolean>();
  editConsumption = !this.ratesService.consumption;
  consumption = this.ratesService.consumption;
  editingExistingValue = false;

  ngOnInit(): void {
    const lastConsumption = this.cacheService.getLastConsumption();
    if (lastConsumption !== undefined && lastConsumption !== null) {
      this.consumption = lastConsumption.toString();
      this.saveConsumption();
    }
  }

  saveConsumption(): void {
    this.ratesService.setConsumption(this.consumption);
    this.cacheService.setLastConsumption(this.consumption);
    this.setEditConsumption(false);
    this.state.emit(true);
  }

  setEditConsumption(value: boolean): void {
    this.editingExistingValue = true;
    this.editConsumption = value;
    this.consumption = '';
    if (this.editConsumption) this.state.emit(false);
  }

  onCancelEditExisting() {
    this.setEditConsumption(false);
    this.consumption = this.ratesService.consumption;
    if (this.consumption) this.state.emit(true);
  }

  get localeConsumption(): string {
    return parseFloat(this.ratesService.consumption).toLocaleString();
  }
}
