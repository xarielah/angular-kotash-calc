import { NgIf } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatesService } from '../../rates.service';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';
import { EditComponent } from '../../shared/icons/edit.component';
import { LocalStorageService } from '../../utils/localstorage.service';

@Component({
  selector: 'app-rate-input',
  templateUrl: './rate-input.component.html',
  standalone: true,
  imports: [FormsModule, EditComponent, FieldErrorComponent, NgIf],
})
export class RateInputComponent implements OnInit {
  private ratesService = inject(RatesService);
  private cacheService = inject(LocalStorageService);
  state = output<boolean>();
  editMode = !this.ratesService.rate;
  rate = this.ratesService.rate;
  editingExistingValue = false;

  ngOnInit(): void {
    const lastRate = this.cacheService.getLastRate();
    if (lastRate !== undefined && lastRate !== null) {
      this.rate = lastRate.toString();
      this.saveRate();
    }
  }

  saveRate(): void {
    this.ratesService.setRate(this.rate);
    this.cacheService.setLastRate(this.rate);
    this.setEditMode(false);
    this.state.emit(true);
  }

  onCancelEditExisting() {
    this.setEditMode(false);
    this.rate = this.ratesService.rate;
    if (this.rate) this.state.emit(true);
  }

  get localeRate(): string {
    return parseFloat(this.ratesService.rate).toLocaleString();
  }

  setEditMode(value: boolean): void {
    this.state.emit(false);
    this.editingExistingValue = true;
    if (value) this.rate = '';
    this.editMode = value;
  }
}
