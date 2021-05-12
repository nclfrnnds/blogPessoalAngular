import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  constructor(
    public modal: BsModalRef
  ) { }

  @Input() message: string;
  @Input() tipo: string = "success";

  ngOnInit() {



  }

  onClose() {
    this.modal.hide();
  }

}
