import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lnd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {

    @Input()
    public text = 'aaa';

  constructor() { }

  ngOnInit(): void {
  }

}
