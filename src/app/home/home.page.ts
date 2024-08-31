import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private menu: MenuController) {}

  ngOnInit() {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: true,
        autoplay: {
          delay: 3000,
        },
      });
      swiperEl.initialize();
    }
  }

  openMenu() {
    this.menu.open('first');
  }

  closeMenu() {
    this.menu.close('first');
  }
}
