import { Injectable, TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}

/************ COMO USAR ************

public toastService: ToastService // <<---- En el constructor

this.toastService.show('I am a standard toast', {
      delay: 3000,
      autohide: true
    });

this.toastService.show('I am a primary toast', {
      classname: 'bg-primary text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'primary'
    });

this.toastService.show('I am a secondary toast', {
      classname: 'bg-secondary text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Secondary'
    });

this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Todo bien'
    });

this.toastService.show('I am a danger toast', {
      classname: 'bg-danger text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Error!!!'
    });

this.toastService.show('I am a warning toast', {
      classname: 'bg-warning text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Cuidado!'
    });

this.toastService.show('I am a info toast', {
      classname: 'bg-info text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Información'
    });

 **************************************************/
