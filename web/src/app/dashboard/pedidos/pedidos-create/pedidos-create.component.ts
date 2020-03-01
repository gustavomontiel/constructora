import { HerramientasService } from './../../herramientas/herramientas.service';
import { MaterialesService } from './../../materiales/materiales.service';
import { ObrasService } from './../../obras/obras.service';
import { Herramienta } from './../../../shared/models/herramienta.model';
import { Material } from './../../../shared/models/material.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PedidosService } from '../pedidos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Obra } from 'src/app/shared/models/obra.model';
import { ListItem } from 'src/app/shared/models/list-item.model';

@Component({
  selector: 'app-pedidos-create',
  templateUrl: './pedidos-create.component.html',
  styleUrls: ['./pedidos-create.component.scss']
})
export class PedidosCreateComponent implements OnInit {

  pedido: Pedido;
  forma: FormGroup;

  obrasOriginal: Obra[];
  obrasListData: ListItem[] = [];
  obrasListSelected: ListItem[] = [];

  materialesOriginal: Material[];
  materialesListData: ListItem[] = [];
  materialesListSelected: ListItem[] = [];

  herramientasOriginal: Herramienta[];
  herramientasListData: ListItem[] = [];
  herramientasListSelected: ListItem[] = [];

  constructor(
    public pedidosService: PedidosService,
    public obrasService: ObrasService,
    public materialesService: MaterialesService,
    public herramientasService: HerramientasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      obra_id: new FormControl(null, Validators.required),
      materiales: this.formBuilder.array([]),
      herramientas: this.formBuilder.array([])
    });
    this.leerDatos();
  }

  leerDatos() {
    this.obrasService.getItems().subscribe(
      res => {
        this.obrasOriginal = res.data;
        this.obrasOriginal.forEach(element => {
          this.obrasListData.push({ ItemId: element.id, itemName: element.nombre });
        });

      }
    );

    this.materialesService.getItems().subscribe(
      res => {
        this.materialesOriginal = res.data;
        console.log(this.materialesOriginal);
        this.materialesOriginal.forEach(element => {
          this.materialesListData.push({ ItemId: element.id, itemName: element.descripcion });
        });

      }
    );

    this.herramientasService.getItems().subscribe(
      res => {
        this.herramientasOriginal = res.data;
        this.herramientasOriginal.forEach(element => {
          this.herramientasListData.push({ ItemId: element.id, itemName: element.nombre });
        });
      }
    );
  }

  crearPedido() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };
        console.log(item);

        this.pedidosService.createItem(item).subscribe(
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
              url.push('pedidos-list');
              this.router.navigateByUrl(url.join('/'));
              console.log(url);
            });
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

    if (this.forma.dirty) {
      return Swal.fire({
        title: 'Salir',
        text: 'Confirma salir y perder los cambios?',
        icon: 'question',
        showCancelButton: true,
      }).then((result) => {
        console.log('result', result.value);
        return result.value ? result.value : false;
      });
    } else {
      return true;
    }

  }

  get materiales(): FormArray {
    return this.forma.get('materiales') as FormArray;
  }

  get herramientas(): FormArray {
    return this.forma.get('herramientas') as FormArray;
  }

  agregarItemPedido(tipo: string) {
    console.log('agregarItemPedido', tipo);
    const numberPatern = '^[0-9.,]+$';
    const itemPedido = {
      id: [null, [ Validators.required, Validators.pattern(numberPatern), Validators.min(1) ]],
      cantidad: [null, [ Validators.required, Validators.pattern(numberPatern), Validators.min(1) ]],
    }

    switch (tipo) {
      case 'material': {
        this.materiales.push(this.formBuilder.group(itemPedido));
        break;
      }
      case 'herramienta': {
        this.herramientas.push(this.formBuilder.group(itemPedido));
        break;
      }
      default: {
        console.log('Error: nose especificó el tipo de item a agregar');
        break;
      }
    }
  }

  removeItemPedido(tipo: string, i: number) {
    console.log('removeItemPedido', tipo, i);
    switch (tipo) {
      case 'material': {
        this.materiales.removeAt(i);
        break;
      }
      case 'herramienta': {
        this.herramientas.removeAt(i);
        break;
      }
      default: {
        console.log('Error: nose especificó el tipo de item a eliminar');
        break;
      }
    }
  }

  onKey( e: any, target: string) {
    if ( e.keyCode === 13 ) {
      this.agregarItemPedido(target);
    }
  }

}
