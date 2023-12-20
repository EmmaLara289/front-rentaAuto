import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
  user: any;
  modalVehicle: any;
  reserved: any;
  vehicleModalData: any;

  constructor(
    private _userService : UserService,
    private _router: Router,
    private modalService: NgbModal,
  ) { 
    this.user = new User(1, '', '', '', '', 1, "", "", "", "");
  }


  ngOnInit(){

    this.user = JSON.parse(localStorage.getItem('user'));
    //this.user = this.user.user;
    //console.log(this.user);
    //console.log(this.user.user.id_user);
    
    this.loadCat();
    
  }

  openModalVehicle(item, dialog:TemplateRef<any>) {
    this.modalVehicle = this.modalService.open(dialog, {size: 'xl'});
    //console.log(item);
    this.vehicleModalData = item;
    console.log(item);
    //console.log(this.vehicleModalData);
    //this.calculateRent();
    //this.calculateApart();
  }

  openModalCancel(id){
    Swal.fire({
        title: "¿Está segur@ de cancelar la reservación?",
        text: "El vehículo será regresado y no se rembolsará el dinero",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        
        if (result.isConfirmed) {
          this.cancelRenta(id);
        }
    });
  }

  openModalRegresar(id){
    Swal.fire({
        title: "¿Está segur@ de regresar ahora el vehículo?",
        text: "El vehículo será regresado (recuerda que si excediste los días habrá recargos).",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.regresarRenta(id);
        }
       
    });
  }

  cancelRenta(id){
    this._userService.cancelReservacion(id).subscribe((response) => {
      Swal.fire({
        title: "Cancelado",
        text: "El vehículo ha sido cancelado con éxito.",
        icon: "success"
      });
      this.modalVehicle.close();
      this.loadCat();
    });
  }

  regresarRenta(id){
    this._userService.RegresarReservacion(id).subscribe((response) => {
      Swal.fire({
        title: "Regresado",
        text: "El vehículo ha sido regresado con éxito.",
        icon: "success"
      });
      this.modalVehicle.close();
      this.loadCat();
    })
  }

  loadCat(){
    this._userService.checkReserved(this.user.user.id_user).subscribe((response) => {
      this.reserved = response;
      console.log(response);
    });
  }

}
