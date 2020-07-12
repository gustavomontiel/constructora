import { GruposService } from './../../grupos/grupos.service';
import { RubrosService } from './../../rubros/rubros.service';
import { MaterialesService } from './../materiales.service';
import { Material } from './../../../shared/models/material.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ListItem } from 'src/app/shared/models/list-item.model';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-materiales-create',
  templateUrl: './materiales-create.component.html',
  styleUrls: ['./materiales-create.component.scss']
})
export class MaterialesCreateComponent implements OnInit {

  material: Material;
  forma: FormGroup;

  rubrosOriginal: Material[];
  rubrosListData: ListItem[] = [];

  gruposOriginal: Material[];
  gruposListData: ListItem[] = [];

  constructor(
    public materialesService: MaterialesService,
    private rubrosService: RubrosService,
    private gruposService: GruposService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }


  ngOnInit() {
    this.forma = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
      rubro: new FormControl(null, Validators.required),
      grupo: new FormControl(null, Validators.required),
    });

    this.getRubros();
    this.getGrupos();
  }

  getRubros() {
    this.rubrosService.getItems().subscribe(
      res => {
        this.rubrosOriginal = res.data;
        this.rubrosOriginal.forEach(element => {
          this.rubrosListData.push({ ItemId: element.rubro, itemName: element.rubro });
        });
      }
    );
  }

  addItem( name: any ) {
    return { ItemId: name, itemName: name };
  }

  getGrupos() {
    this.gruposService.getItems().subscribe(
      res => {
        this.gruposOriginal = res.data;
        this.gruposOriginal.forEach(element => {
          this.gruposListData.push({ ItemId: element.grupo, itemName: element.grupo });
        });
      }
    );
  }


  createItem() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };

        this.materialesService.createItem(item).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            }).then(res => {
              this.forma.markAsPristine();
              const url = this.router.url.split('/');
              url.pop();
              url.push('materiales-list');
              this.router.navigateByUrl(url.join('/'));
            });
          },
          error => {
            // tslint:disable-next-line: no-unused-expression
            (error instanceof HttpErrorResponse) && this.formErrorHandlerService.fromServer(this.forma, error);
          }
        );
      }
    });

  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {

    if ( this.forma.dirty ) {
      return Swal.fire({
        title: 'Salir',
        text: 'Confirma salir y perder los cambios?',
        icon: 'question',
        showCancelButton: true,
      }).then(( result ) => {
        return result.value ? result.value : false;
      });
    } else {
      return true;
    }

  }

}
