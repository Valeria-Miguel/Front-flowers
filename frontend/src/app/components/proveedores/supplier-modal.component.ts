import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.css']
})
export class SupplierModalComponent {
  @Input() supplier: Supplier = {
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    tax_id: '',
    notes: ''
  };
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<Supplier>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit(this.supplier);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}