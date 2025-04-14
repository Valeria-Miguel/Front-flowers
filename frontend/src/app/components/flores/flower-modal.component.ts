import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flower } from '../../models/flower.model';

@Component({
  selector: 'app-flower-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flower-modal.component.html',
  styleUrls: ['./flower-modal.component.css']
})
export class FlowerModalComponent {
  @Input() flower: Flower = {
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
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<Flower>();
  @Output() cancel = new EventEmitter<void>();

  seasons: string[] = ['Primavera', 'Verano', 'Otoño', 'Invierno'];

  onSave(): void {
    this.save.emit(this.flower);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}