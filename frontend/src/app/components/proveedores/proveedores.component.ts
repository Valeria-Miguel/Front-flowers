import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Supplier } from '../../models/supplier.model';
import { loadSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../../actions/supplier.actions';
import { selectAllSuppliers, selectSuppliersLoading, selectSuppliersError } from '../../selectors/supplier.selectors';
import { SupplierModalComponent } from './supplier-modal.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, SupplierModalComponent],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  private store = inject(Store);

  suppliers$: Observable<Supplier[]> = this.store.select(selectAllSuppliers);
  loading$: Observable<boolean> = this.store.select(selectSuppliersLoading);
  error$: Observable<string | null> = this.store.select(selectSuppliersError);

  showModal: boolean = false;
  selectedSupplier: Supplier | null = null;
  isEditMode: boolean = false;

  constructor() {
    this.store.dispatch(loadSuppliers());
  }

  openCreateModal(): void {
    this.selectedSupplier = {
      name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: '',
      tax_id: '',
      notes: ''
    };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(supplier: Supplier): void {
    this.selectedSupplier = { ...supplier };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedSupplier = null;
  }

  saveSupplier(supplier: Supplier): void {
    if (this.isEditMode && this.selectedSupplier?.id) {
      this.store.dispatch(updateSupplier({ id: this.selectedSupplier.id, supplier }));
    } else {
      this.store.dispatch(createSupplier({ supplier }));
    }
    this.closeModal();
  }

  deleteSupplier(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.store.dispatch(deleteSupplier({ id }));
    }
  }
}