import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Flower } from '../../models/flower.model';
import { loadFlowers, createFlower, updateFlower, deleteFlower } from '../../actions/flowers.actions';
import { selectAllFlowers, selectFlowersLoading, selectFlowersError } from '../../selectors/flowers.selectors';
import { FlowerModalComponent } from './flower-modal.component';

@Component({
  selector: 'app-flores',
  standalone: true,
  imports: [CommonModule, FlowerModalComponent],
  templateUrl: './flores.component.html',
  styleUrls: ['./flores.component.css']
})
export class FloresComponent {
  private store = inject(Store);

  flowers$: Observable<Flower[]> = this.store.select(selectAllFlowers);
  loading$: Observable<boolean> = this.store.select(selectFlowersLoading);
  error$: Observable<string | null> = this.store.select(selectFlowersError);

  showModal: boolean = false;
  selectedFlower: Flower | null = null;
  isEditMode: boolean = false;

  constructor() {
    this.store.dispatch(loadFlowers());
  }

  openCreateModal(): void {
    this.selectedFlower = {
      name: '',
      color: '',
      price: 0,
      stock: 0,
      description: '',
      has_scent: false,
      bloom_season: '',
      stem_length: 0,
      lifespan: 0
    };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(flower: Flower): void {
    this.selectedFlower = { ...flower };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedFlower = null;
  }

  saveFlower(flower: Flower): void {
    if (this.isEditMode && this.selectedFlower?.id) {
      this.store.dispatch(updateFlower({ id: this.selectedFlower.id, flower }));
    } else {
      this.store.dispatch(createFlower({ flower }));
    }
    this.closeModal();
  }

  deleteFlower(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar esta flor?')) {
      this.store.dispatch(deleteFlower({ id }));
    }
  }
}