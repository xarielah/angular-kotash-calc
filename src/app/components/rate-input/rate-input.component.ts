import { NgIf } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatesService } from '../../rates.service';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';
import { EditComponent } from '../../shared/icons/edit.component';

@Component({
  selector: 'app-rate-input',
  templateUrl: './rate-input.component.html',
  standalone: true,
  imports: [FormsModule, EditComponent, FieldErrorComponent, NgIf],
})
export class RateInputComponent {
  private ratesService = inject(RatesService);
  state = output<boolean>();
  editMode = !this.ratesService.rate;
  rate = this.ratesService.rate;
  editingExistingValue = false;

  saveRate(): void {
    this.ratesService.setRate(this.rate);
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
