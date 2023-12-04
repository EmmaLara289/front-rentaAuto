import { Component, OnInit, TemplateRef, inject  } from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {

  modalVehicle: any;

  catalogo: any;
  vehicleModalData: any;
  
  constructor(
    private _userService : UserService,
    private _router: Router,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(){
    this._userService.getCat().subscribe((response) =>{
      this.catalogo = response;
      console.log(response);
    });
  }

  openModalVehicle(item, dialog:TemplateRef<any>) {
    this.modalVehicle = this.modalService.open(dialog, {size: 'xl'});
    this.vehicleModalData = item;
  }

  closeModalVehicle(){
    this.modalVehicle.close();
  }

}
