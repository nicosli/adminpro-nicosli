import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label: string = '';
  constructor( private router: Router, public title: Title, public meta: Meta ) {
    this.getDataRoute()
      .subscribe(data => {
        console.log(data);

        this.label = data.titulo;
        this.title.setTitle(this.label);

        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };
        this.meta.updateTag(metaTag);

      });
  }

  getDataRoute() {
    return this.router.events
      .filter(event => event instanceof ActivationEnd)
      .filter((event: ActivationEnd) => event.snapshot.firstChild === null)
      .map((evento: ActivationEnd) => evento.snapshot.data);
  }

  ngOnInit() {
  }

}
