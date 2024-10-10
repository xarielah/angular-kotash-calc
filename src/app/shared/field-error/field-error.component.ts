import { Component } from '@angular/core';

@Component({
  selector: 'app-field-error',
  template: `<span class="text-red-600 font-bold">* <ng-content /></span>`,
  standalone: true,
})
export class FieldErrorComponent {}
