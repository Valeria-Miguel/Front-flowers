import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/users.model';
import { loadUsers, createUser, updateUser,deleteUser } from '../../actions/users.actions';
import { selectAllUsers, selectUsersLoading } from '../../selectors/users.selectors';
import { UserModalComponent } from './user-modal.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UserModalComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  private store = inject(Store);

  users$: Observable<User[]> = this.store.select(selectAllUsers);
  loading$: Observable<boolean> = this.store.select(selectUsersLoading);

  showModal: boolean = false;
  selectedUser: User | null = null;
  isEditMode: boolean = false;

  constructor() {
    this.store.dispatch(loadUsers());
  }

  openCreateModal(): void {
    this.selectedUser = {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      second_last_name: '',
      role: '',
      password: ''
    };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(user: User): void {
    this.selectedUser = { ...user, password: '' }; 
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  saveUser(user: User): void {
    if (this.isEditMode && this.selectedUser?.id) {
      this.store.dispatch(updateUser({ id: this.selectedUser.id, user }));
    } else {
      this.store.dispatch(createUser({ user }));
    }
    this.closeModal();
  }

  deleteUser(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar este usuario?')) {
      this.store.dispatch(deleteUser({ id }));
    }
  }
}