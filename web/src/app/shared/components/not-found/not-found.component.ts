import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  // templateUrl: './not-found.component.html',

  template: `<h2> 404 - Page not found </h2>
   <p *ngIf="path" >You might want to go to the
     <a [routerLink]="path">"{{ path }}" page</a>
  </p>`,

  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  path: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
