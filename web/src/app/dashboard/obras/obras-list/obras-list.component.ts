import { ObrasService } from './../obras.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Obra } from 'src/app/shared/models/obra.model';

@Component({
  selector: 'app-obras-list',
  templateUrl: './obras-list.component.html',
  styleUrls: ['./obras-list.component.scss']
})
export class ObrasListComponent implements OnInit {

  tableData: Obra[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public obrasService: ObrasService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.obrasService.getItems()
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
    url.push('obras-create');
    this.route.navigateByUrl(url.join('/'));
  }

  editarItem(id: string) {
    console.log('editarItem');
    const url = this.route.url.split('/');
    url.pop();
    url.push('obras-update');
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
        this.obrasService.deleteItem(item)
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
