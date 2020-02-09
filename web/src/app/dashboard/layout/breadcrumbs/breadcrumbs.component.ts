import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

export interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})

export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo: string;
  breadcrumbs;
  subscription: Subscription;


  constructor(
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {

    if (this.authService.estaLogueado()) {
      this.breadcrumbs = JSON.parse(sessionStorage.getItem('breadcrumbs')) || [{ label: 'Inicio', url: '/home/' }];
    }

    /*
    this.breadcrumbs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd ),
      distinctUntilChanged(),
      map(
          event => this.buildBreadCrumb(this.activatedRoute.root)
          )
    );
    */
   this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd ),
      // distinctUntilChanged()
    ).subscribe(
      event => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {

    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data['title'] : '';
    const path = route.routeConfig ? route.routeConfig.path : '';

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = (String(label).length > 0) ? [...breadcrumbs, breadcrumb] : breadcrumbs;
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    sessionStorage.setItem('breadcrumbs', JSON.stringify(newBreadcrumbs));

    return newBreadcrumbs;
  }
}
