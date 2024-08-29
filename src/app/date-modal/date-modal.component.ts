import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-modal',
  standalone: true,
  imports: [ CommonModule
  ],
  templateUrl: './date-modal.component.html',
  styleUrl: './date-modal.component.css',
})
export class DateModalComponent {
  @Input() date: string = '';
  @Input() event: any = null;

  constructor(public activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
