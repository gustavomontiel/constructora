import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit, enableProdMode, ɵConsole } from '@angular/core';
import { ORGANIZACION } from './../../../config/config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public organizacion: string;
  // tslint:disable-next-line: variable-name
  public menuAdmin: boolean;
  breadcrumbList: Array<any> = [];
  menu: Array<any> = [];

  constructor(
    public usuarioService: AuthService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    this.organizacion = ORGANIZACION;


    this.menuAdmin = this.usuarioService.isAdmin();
    var $sidebar = $('.control-sidebar')
    var $container = $('<div />', {
      class: 'p-3 control-sidebar-content'
    })

    $sidebar.append($container)

    var navbar_dark_skins = [
      'navbar-primary',
      'navbar-secondary',
      'navbar-info',
      'navbar-success',
      'navbar-danger',
      'navbar-indigo',
      'navbar-purple',
      'navbar-pink',
      'navbar-teal',
      // 'navbar-cyan',
      'navbar-dark',
      // 'navbar-gray-dark',
      // 'navbar-gray',
    ]

    var navbar_light_skins = [
      'navbar-light',
      'navbar-warning',
      'navbar-white',
      'navbar-orange',
    ]

    $container.append(
      '<h5>Preferencias visuales</h5><hr class="mb-1"/>'
      + '<h6>Color barra de Cabecera</h6>'
    )

    var $navbar_variants = $('<div />', {
      'class': 'd-flex'
    })
    var navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins)
    var $navbar_variants_colors = createSkinBlock(navbar_all_colors, 'main_header_color', function (e) {
      var color = $(this).data('color')
      var $main_header = $('.main-header')
      $main_header.removeClass('navbar-dark').removeClass('navbar-light')
      navbar_all_colors.map(function (color) {
        $main_header.removeClass(color)
      })

      if (navbar_dark_skins.indexOf(color) > -1) {
        $main_header.addClass('navbar-dark')
      } else {
        $main_header.addClass('navbar-light')
      }
      console.log('cambio de color cabecera');
      localStorage.setItem('main_header_color', '#' + this.id);
      $main_header.addClass(color)
    })

    $navbar_variants.append($navbar_variants_colors)

    $container.append($navbar_variants)

    var $checkbox_container = $('<div />', {
      'class': 'mb-4'
    })
    var $navbar_border = $('<input />', {
      type: 'checkbox',
      id: 'navbar_bottom_border',
      value: 1,
      checked: $('.main-header').hasClass('border-bottom'),
      'class': 'mr-1'
    }).on('click', function () {
      console.log('check en border header')
      if ($(this).is(':checked')) {
        $('.main-header').addClass('border-bottom')
        localStorage.setItem('navbar_bottom_border', '1');
      } else {
        $('.main-header').removeClass('border-bottom')
        localStorage.setItem('navbar_bottom_border', '0');
      }
    })
    $checkbox_container.append($navbar_border)
    $checkbox_container.append('<span>Borde bajo de Cabecera</span>')
    $container.append($checkbox_container)


    var sidebar_colors = [
      'bg-primary',
      'bg-warning',
      'bg-info',
      'bg-danger',
      'bg-success'
    ]

    var sidebar_skins = [
      'sidebar-dark-primary',
      'sidebar-dark-warning',
      'sidebar-dark-info',
      'sidebar-dark-danger',
      'sidebar-dark-success',
      'sidebar-light-primary',
      'sidebar-light-warning',
      'sidebar-light-info',
      'sidebar-light-danger',
      'sidebar-light-success'
    ]

    $container.append('<h6>Variantes Menú Izq. Oscuro</h6>')
    var $sidebar_variants = $('<div />', {
      'class': 'd-flex'
    })
    $container.append($sidebar_variants)
    $container.append(createSkinBlock(sidebar_colors, 'dark_sidebar_color', function () {
      console.log('cambio de color menu izq. oscuro');
      localStorage.setItem('sidebar_color', '#' + this.id);
      var color = $(this).data('color')
      var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
      var $sidebar = $('.main-sidebar')
      sidebar_skins.map(function (skin) {
        $sidebar.removeClass(skin)
      })

      $sidebar.addClass(sidebar_class)
    }))

    $container.append('<h6>Variantes Menú Izq. Claro</h6>')
    var $sidebar_variants = $('<div />', {
      'class': 'd-flex'
    })
    $container.append($sidebar_variants)
    $container.append(createSkinBlock(sidebar_colors, 'light_sidebar_color', function () {
      console.log('cambio de color menu izq. claro');
      localStorage.setItem('sidebar_color', '#' + this.id);
      var color = $(this).data('color')
      var sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
      var $sidebar = $('.main-sidebar')
      sidebar_skins.map(function (skin) {
        $sidebar.removeClass(skin)
      })

      $sidebar.addClass(sidebar_class)
    }))

    var logo_skins = navbar_all_colors
    $container.append('<h6>Color Ezquina sup izq.</h6>')
    var $logo_variants = $('<div />', {
      'class': 'd-flex'
    })

    $container.append($logo_variants)
    var $clear_btn = $('<a />', {
      href: 'javascript:void(0)'
    }).text('clear').on('click', function () {
      console.log('click en clear');
      var $logo = $('.brand-link')
      logo_skins.map(function (skin) {
        $logo.removeClass(skin)
      })
    })

    $container.append(createSkinBlock(logo_skins, 'top_left_color', function () {
      console.log('cambio de color esq sup izq. ');
      localStorage.setItem('top_left_color', '#' + this.id);
      var color = $(this).data('color')
      var $logo = $('.brand-link')
      logo_skins.map(function (skin) {
        $logo.removeClass(skin)
      })
      $logo.addClass(color)
    }).append($clear_btn))

    ////
    // inicializo todo

    if(localStorage.getItem('main_header_color')){
      $(localStorage.getItem('main_header_color')).trigger( 'click' );
    }
    if(localStorage.getItem('sidebar_color')){
      console.log(localStorage.getItem('sidebar_color'))
      $(localStorage.getItem('sidebar_color')).trigger( 'click' );
    }
    if(localStorage.getItem('top_left_color')){
      console.log(localStorage.getItem('top_left_color'))
      $(localStorage.getItem('top_left_color')).trigger( 'click' );
    }
    if(localStorage.getItem('navbar_bottom_border')){
      if(localStorage.getItem('navbar_bottom_border') === '1') {
        $('#navbar_bottom_border').trigger( 'click' );
      }
    }
    localStorage.setItem('navbar_bottom_border', '0');

    var $cleanSettings_container = $('<div />', {
      'class': 'd-flex'
    })
    var $cleanSettings_border = $('<input />', {
      type: 'button',
      value: 'Sin preferencias',
      'class': 'btn btn-warning mr-1'
    }).on('click', function (event) {

      localStorage.removeItem('main_header_color');
      $( '#main_header_color_navbar-light' ).trigger( 'click' );

      localStorage.removeItem('navbar_bottom_border');
      if ( $( '#navbar_bottom_border' ).is(':checked') ) {
        $( '#navbar_bottom_border' ).trigger( 'click' );
      }


      localStorage.removeItem('sidebar_color');
      $( '#dark_sidebar_color_bg-primary' ).trigger( 'click' );

      localStorage.removeItem('top_left_color');
      $( '#top_left_color_navbar-dark' ).trigger( 'click' );
    })
    $cleanSettings_container.append($cleanSettings_border)
        $container.append($cleanSettings_container)

    ////

    function createSkinBlock(colors, parte, callback) {
      var $block = $('<div />', {
        'class': 'd-flex flex-wrap mb-3'
      })

      colors.map(function (color) {
        var $color = $('<div />', {
          'class': (typeof color === 'object' ? color.join(' ') : color) + ' elevation-2',
          'id': parte + '_' +color
        })

        $block.append($color)

        $color.data('color', color)

        $color.css({
          width: '20px',
          height: '20px',
          borderRadius: '25px',
          marginRight: 10,
          marginBottom: 10,
          opacity: 0.8,
          cursor: 'pointer',
        })

        $color.hover(function () {
          $(this).css({ opacity: 1 }).removeClass('elevation-2').addClass('elevation-4')
        }, function () {
          $(this).css({ opacity: 0.8 }).removeClass('elevation-4').addClass('elevation-2')
        })

        if (callback) {
          $color.on('click', callback)
        }
      })

      return $block
    }
  }

  logOut() {
    this.usuarioService.logout();
  }

}
