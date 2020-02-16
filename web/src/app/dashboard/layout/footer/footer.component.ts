import { Component, OnInit } from '@angular/core';
import { ORGANIZACION } from '../../../shared/config/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  year: number;
  public organizacion: string;

  constructor() { }

  ngOnInit() {
    this.organizacion = ORGANIZACION;
    this.year = new Date().getFullYear();
  }

}
