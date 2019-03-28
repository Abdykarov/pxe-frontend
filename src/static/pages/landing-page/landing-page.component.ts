import { Component, OnInit } from '@angular/core';
import {IBreadcrumbItems} from '../../../common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  selector: 'lnd-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
    public breadcrumbItemsSimple: IBreadcrumbItems;

  constructor() {
      this.breadcrumbItemsSimple = [
          {
              label: 'Landing page',
              url: null,
          },
      ];

  }

  ngOnInit() {
  }

}
