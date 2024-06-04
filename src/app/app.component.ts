import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DataTablesModule, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: Config = {
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
    }
  };
  dtTrigger = new Subject<any>();
  categoriasSubject = new Subject<{ id: number, nombre: string }[]>();
  categorias$ = this.categoriasSubject.asObservable();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.categoriasSubject.next([
      { id: 1, nombre: 'Categoria 1' },
      { id: 2, nombre: 'Categoria 2' },
    ]);

    this.dtElement.dtInstance.then(dtInstance => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }
}
