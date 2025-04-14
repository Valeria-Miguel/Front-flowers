import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { loadFlowers } from './actions/flowers.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private store = inject(Store);

  async ngOnInit() {
    try {
      const isAuthenticated = await this.authService.initializeAuthState();
      const token = this.authService.getAccessToken(); 
      console.log('Estado de autenticación:', { isAuthenticated, token });

      if (isAuthenticated) {
        console.log('Usuario autenticado detectado al iniciar');
        this.store.dispatch(loadFlowers());
      } else {
        console.log('No hay usuario autenticado al iniciar, intentando cargar flores si hay token');
        
        if (token) {
          console.log('Token encontrado, cargando flores');
          this.store.dispatch(loadFlowers());
        } else {
          console.log('No hay token, flores no cargadas');
        }
      }
    } catch (error) {
      console.error('Error al inicializar estado de autenticación:', error);
    }
  }
}