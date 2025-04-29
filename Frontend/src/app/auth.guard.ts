import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Auth guard: verificando autenticacion...')

  if (authService.isLoggedIn()) {
    console.log('Guard: autenticado')
    return true;
  } else {
    console.log('Guard: no autenticado')
    router.navigate(['/login']);
    return false
  }
};
