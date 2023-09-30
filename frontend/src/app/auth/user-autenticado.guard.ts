import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';



export class  UserToken  {
  constructor(private router: Router, private authService: AuthService) {}
  getToken(): string {
    return localStorage.getItem('usuario') as string
  }
}

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(currentUser: string): boolean {
    localStorage.getItem('access_token')
    if (!currentUser && !localStorage.getItem('access_token')) {
      return false
    } else {
      return true;
    }
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}

export const userAutenticadoGuard: CanActivateFn = (route, state) => {

  return inject(PermissionsService).canActivate(localStorage.getItem('usuario') as string);
};
