import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { loadOrders, createOrder, updateOrder, deleteOrder } from '../../actions/orders.actions';
import { selectAllOrders, selectOrdersLoading, selectOrdersError } from '../../selectors/orders.selectors';
import { OrderModalComponent } from './order-modal.component';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule, OrderModalComponent],
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {
  private store = inject(Store);

  orders$: Observable<Order[]> = this.store.select(selectAllOrders);
  loading$: Observable<boolean> = this.store.select(selectOrdersLoading);
  error$: Observable<string | null> = this.store.select(selectOrdersError);

  showModal: boolean = false;
  selectedOrder: Order | null = null;
  isEditMode: boolean = false;

  constructor() {
    this.store.dispatch(loadOrders());
  }

  openCreateModal(): void {
    this.selectedOrder = {
      delivery_address: '',
      delivery_date: '',
      current_state: 'PENDING',
      notes: '',
      items: []
    };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(order: Order): void {
    this.selectedOrder = {
      ...order,
      items: order.items ? order.items.map(item => ({ ...item })) : []
    };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedOrder = null;
  }

  saveOrder(order: Order): void {
    if (this.isEditMode && this.selectedOrder?.id) {
      this.store.dispatch(updateOrder({ id: this.selectedOrder.id, order }));
    } else {
      this.store.dispatch(createOrder({ order }));
    }
    this.closeModal();
  }

  deleteOrder(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar esta orden?')) {
      this.store.dispatch(deleteOrder({ id }));
    }
  }
}