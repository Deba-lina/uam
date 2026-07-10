import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router);
  if (authService.isLoggedIn()) {
    router.navigate(['/profile']);
    return false;
  }
  return true;
};
