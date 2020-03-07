import { MaterialesService } from './../materiales.service';
import { Material } from './../../../shared/models/material.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ListItem } from 'src/app/shared/models/list-item.model';
import { RubrosService } from '../../rubros/rubros.service';
import { GruposService } from '../../grupos/grupos.service';


@Component({
  selector: 'app-materiales-update',
  templateUrl: './materiales-update.component.html',
  styleUrls: ['./materiales-update.component.scss']
})
export class MaterialesUpdateComponent implements OnInit {

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
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
      rubro: new FormControl(null, Validators.required),
      grupo: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

    this.getRubros();
    this.getGrupos();

  }

  getRubros() {
    this.rubrosService.getItems().subscribe(
      res => {
        this.rubrosOriginal = res.data;
        console.log(this.rubrosOriginal);
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
        console.log(this.gruposOriginal);
        this.gruposOriginal.forEach(element => {
          this.gruposListData.push({ ItemId: element.grupo, itemName: element.grupo });
        });
      }
    );
  }

  leerItem(id: string) {

    this.materialesService.getItemById(id)
      .subscribe(resp => {
        this.material = resp.data;
        console.log(this.material);
        this.forma.setValue({
          codigo: this.material.codigo,
          descripcion: this.material.descripcion,
          unidad: this.material.unidad,
          rubro: this.material.rubro,
          grupo: this.material.grupo,
        });
      }
      );
  }

  updateItem() {

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const item = { ... this.forma.value, id: this.material.id };

        this.materialesService.updateItem(item).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
            this.forma.markAsPristine();
          },
          err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.',
              'error'
            );
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
        console.log('result', result.value);
        return result.value ? result.value : false;
      });
    } else {
      return true;
    }

  }

}
