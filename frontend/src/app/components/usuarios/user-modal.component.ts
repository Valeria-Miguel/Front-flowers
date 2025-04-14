import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() user: User = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: ''
  };
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  roles: string[] = ['Administrador', 'Empleado'];

  onSave(): void {
    this.save.emit(this.user);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}