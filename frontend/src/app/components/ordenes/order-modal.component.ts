import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, OrderItem } from '../../models/order.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Flower } from '../../models/flower.model';
import { selectAllFlowers } from '../../selectors/flowers.selectors';

type OrderState = 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {
  private store = inject(Store);

  @Input() set order(value: Order) {
    this._order = {
      ...value,
      items: value.items ? value.items.map(item => ({ ...item })) : [],
      current_state: value.current_state || 'PENDING'
    };
  }
  get order(): Order {
    return this._order;
  }
  private _order: Order = {
    delivery_address: '',
    delivery_date: '',
    current_state: 'PENDING',
    notes: '',
    items: []
  };

  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<Order>();
  @Output() cancel = new EventEmitter<void>();

  flowers$: Observable<Flower[]> = this.store.select(selectAllFlowers);
  states: OrderState[] = ['PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'];
  stateDisplays: Record<OrderState, string> = {
    PENDING: 'Pendiente',
    PREPARING: 'En preparación',
    READY: 'Lista para entregar',
    DELIVERED: 'Entregada',
    CANCELLED: 'Cancelada'
  };

  addItem(): void {
    this._order.items = [...this._order.items, { flower: 0, quantity: 1 }];
  }

  removeItem(index: number): void {
    this._order.items = this._order.items.filter((_, i) => i !== index);
  }

  onSave(): void {
    const orderToSave: Order = {
      ...this._order,
      delivery_date: this._order.delivery_date
        ? new Date(this._order.delivery_date).toISOString()
        : '',
      items: this._order.items
        .filter(item => item.flower > 0 && item.quantity > 0)
        .map(item => ({
          id: item.id,
          flower: item.flower,
          quantity: item.quantity
        })),
      current_state: this._order.current_state 
    };
    this.save.emit(orderToSave);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  trackByIndex(index: number): number {
    return index;
  }
}