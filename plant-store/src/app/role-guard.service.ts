import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public service: AppService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.service.getUserRole() !== 'admin') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
