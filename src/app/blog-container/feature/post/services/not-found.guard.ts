import { Category } from './../../../../admin-container/admin-single/category/shared/category';
import { BlogComponentService } from './../../../shared/services/blog-component.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotFoundGuard implements CanActivate {
  constructor(
    private router: Router,
    private blogComponentService:BlogComponentService
  ) {
  }
  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.blogComponentService.getCategories()
      .map((categories:Category[]) => categories.map(category => category.url))
      .map(categoriesUrl => {
        if (!categoriesUrl.includes(state.url.split('/')[1])) {
          this.router.navigate(['/not-found'])
          return false
        } else return true;
      })

      // .subscribe((categories:Category[]) => {
      //   let categoriesUrl = categories;
          // .map(category => category.url)
      // })
      
      // if(!f1List.includes(state.url.split('/')[1])) { // if not includes url redirect to 404
      //     this.router.navigate(['/not-found'])
      //     return false
      //   }
      //   return true
      // if(state.url.split('/')[1] != 'marketing') { // state not includes certain subject, redirect to 404
      //   this.router.navigate(['/not-found'])
      //   return false
      // }
      //   return true
      

  }

}
