import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PedidosService } from '../pedidos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  tableData: Pedido[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'obra', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public pedidosService: PedidosService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.pedidosService.getItems()
      .subscribe(resp => {
        console.log(resp);
        this.tableData = resp.data;
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  agregarItem() {
    const url = this.route.url.split('/');
    url.pop();
    url.push('pedidos-create');
    this.route.navigateByUrl(url.join('/'));
  }

  editarItem(id: string) {
    console.log('editarItem');
    const url = this.route.url.split('/');
    url.pop();
    url.push('pedidos-update');
    this.route.navigateByUrl( url.join('/') + '/' + id );
  }

  verItem(id: string) {
    console.log('verItem');
    const url = this.route.url.split('/');
    url.pop();
    url.push('pedidos-view');
    this.route.navigateByUrl( url.join('/') + '/' + id );
  }

  borrarItem(item) {

    Swal.fire({

      title: 'Confirmación?',
      text: 'Confirma eliminar el registro ' + item.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'

    }).then((result) => {

      if (result.value) {
        this.pedidosService.deleteItem(item)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.getTableData();
            },
            err => {
              Swal.fire(
                'Error!',
                'La operación no pudo realizarse.',
                'error'
              );
            }
          );
      }
    });
  }


}
