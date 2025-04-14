import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { usersReducer } from './reducers/users.reducer';  
import { usersEffects } from './effects/users.effects';   
import { flowersReducer } from './reducers/flowers.reducer'; 
import { flowersEffects } from './effects/flowers.effects';
import { suppliersReducer } from './reducers/supplier.reducer';
import { suppliersEffects } from './effects/supplier.effects';
import { ordersReducer } from './reducers/orders.reducer';
import { ordersEffects } from './effects/orders.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      users: usersReducer,
      flowers: flowersReducer,
      suppliers: suppliersReducer,
      orders: ordersReducer
    }),
    provideEffects(usersEffects, flowersEffects, suppliersEffects, ordersEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false 
    })
  ]
};