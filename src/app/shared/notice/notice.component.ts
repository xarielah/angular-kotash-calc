import { Component, Input, output } from '@angular/core';
import { CloseComponent } from '../icons/close.component';

type NoticeType = 'warn' | 'error' | 'info';

@Component({
  selector: 'app-notice',
  templateUrl: 'notice.component.html',
  standalone: true,
  imports: [CloseComponent],
})
export class NoticeComponent {
  @Input() type: NoticeType = 'info';
  noticeTypeClasses: Record<NoticeType, string> = {
    warn: 'border-[1px] border-yellow-600 bg-yellow-100 text-yellow-800',
    error: 'border-[1px] border-red-600 bg-red-100 text-red-800',
    info: 'border-[1px] border-blue-300 bg-blue-100 text-blue-800',
  };
  close = output();

  // Emit the close event
  closeNotice() {
    this.close.emit();
  }

  get classes() {
    return this.noticeTypeClasses[this.type];
  }
}
