import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos-view',
  templateUrl: './pedidos-view.component.html',
  styleUrls: ['./pedidos-view.component.scss']
})
export class PedidosViewComponent implements OnInit {

  public pedido: any;

  constructor(
    public pedidosService: PedidosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.cargarOferta(id);
    });
  }

  cargarOferta(id: string) {
    this.pedidosService.getItemById(id)
      .subscribe(pedido => {
        this.pedido = pedido.data;
        console.log(this.pedido);
      });
  }

}
