import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';

@Component({
    selector: 'pxe-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent extends AbstractComponent implements OnInit {}
