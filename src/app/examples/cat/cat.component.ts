import { Component, OnInit, TemplateRef, inject  } from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {

  selectedModel: string;
  models: any;
  modalVehicle: any;
  modalApart: any;
  fecha_inicio: Date;
  fecha_final: Date;
  catalogo: any;
  vehicleModalData: any;
  dias: number;
  precio: number;
  modalCat = true;
  modalCat_2 = true;
  fechaActual: Date = new Date();
  modelSelected: any;
  colores: any;
  pasajeros: any;
  selectedColor: any;
  selectedPasajero: any;
  precio_apart: number;
  user: any;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  constructor(
    private _userService : UserService,
    private _router: Router,
    private modalService: NgbModal,
  ) { 
  }
  
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    //this.user = this.user.user;
    //console.log(this.user);
    //console.log(this.user.user.id_user);
    this._userService.getModels().subscribe((response) => {
      this.models = response;
    });

    this.loadCat();

  }

  openModalVehicle(item, dialog:TemplateRef<any>) {
    this.modalVehicle = this.modalService.open(dialog, {size: 'xl'});
    this.vehicleModalData = item;
    console.log(this.vehicleModalData);
    this.calculateRent();
    this.calculateApart();
  }

  openModalApart(item, dialog:TemplateRef<any>) {
    //this.modalApart = this.modalService.open(dialog, {size: 'sm'});
    this.vehicleModalData = item;
    Swal.fire({
      title: "¿Está segur@ de reservar este vehículo desde el día " + '"' +this.formDate(this.range.get('start').value) + '"' + " hasta " + '"' +this.formDate(this.range.get('end').value) + '"' + "?",
      text: "El precio sería de " + this.precio_apart,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if(this.user !== null){
        if (result.isConfirmed) {
          this.Reservar();
        }
      }else{
        Swal.fire({
          icon: "error",
          title: "Verificación de usuario",
          text: "Inicie sesión primero para poder utilizar todos los servicios",
          footer: '<a href="/login">Haz click aquí</a>'
        });
      }
    });
  }

  openModalRent(item, dialog:TemplateRef<any>) {
    //this.modalApart = this.modalService.open(dialog, {size: 'sm'});
    this.vehicleModalData = item;
    Swal.fire({
      title: "¿Está segur@ de rentar este vehículo desde el día de hoy " + "hasta " + '"' +this.formDate(this.range.get('end').value) + '"' + "?",
      text: "El precio sería de " + this.precio,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if(result.isConfirmed){
        if(this.user !== null){
          this.Rentar();
        }else{
          Swal.fire({
            icon: "error",
            title: "Verificación de usuario",
            text: "Inicie sesión primero para poder utilizar todos los servicios",
            footer: '<a href="/login">Haz click aquí</a>'
          });
        }
      }
    });
  }

  closeModalVehicle(){
    this.modalVehicle.close();
  }

  calculateRent(){
    this._userService.calcularRenta(this.dias, this.vehicleModalData.data.id_vehicles).subscribe((response) => {
      this.precio = response;
      console.log(response);
    });
  }

  calculateApart(){
    this._userService.calcularApartado(this.dias, this.vehicleModalData.data.id_vehicles).subscribe((response) => {
      this.precio_apart = response;
      console.log(response);
    });
  }

  cancelDateRange() {
    // Lógica para cancelar la selección del rango
    this.fecha_final = null;
    this.fecha_inicio = null;
  }

  consoleLog() {

    console.log('Start Date:', this.formDate(this.range.get('start').value));
    console.log('End Date:', this.formDate(this.range.get('end').value));

    this._userService.getDays(this.formDate(this.range.get('start').value), this.formDate(this.range.get('end').value)).subscribe((response) =>{
      console.log("dias: ", response);
      this.modalCat = false;
      this.dias = response;
    })

    // Puedes agregar tu lógica aquí para manejar el rango de fechas seleccionado
  }

  resetDates() {
    this.range.reset({
      start: null,
      end: null
    });

    this.modalCat = true;
    this.dias = undefined;

  }

  formDate(date){
    const fecha = new Date(date);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Nota: en JavaScript, los meses van de 0 a 11
    const anio = fecha.getFullYear();

    // Formatear a dd/mm/aaaa
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
  }

  selectModel(event: any) {
    // `event` contiene información sobre el cambio de selección, si es necesario
    console.log('Modelo seleccionado:', event);

    if(event.value !== "undefined"){
      this._userService.getColores(this.modelSelected).subscribe((response) => {
        this.colores = response;
      });
  
      this._userService.getPasajeros(this.modelSelected).subscribe((response) => {
        this.pasajeros = response;
        this.modalCat_2 = false;  
      });
    }else{
      this.modelSelected = undefined;
      this.selectedColor = undefined;
      this.selectedPasajero = undefined;
      this.modalCat_2 = true;
    }
    
    this.loadCat();
    //if(event)
    // Puedes agregar tu lógica aquí para realizar algo cuando se seleccione una opción
  }

  selectColor(event: any) {
    // `event` contiene información sobre el cambio de selección, si es necesario
    console.log('Modelo seleccionado:', event);

    if(event.value === "undefined"){

      this.selectedColor = undefined;

    }
    
    this.loadCat();
    //if(event)
    // Puedes agregar tu lógica aquí para realizar algo cuando se seleccione una opción
  }

  selectPasajero(event: any) {
    // `event` contiene información sobre el cambio de selección, si es necesario
    console.log('Modelo seleccionado:', event);

    if(event.value === "undefined"){

      this.selectedPasajero = undefined;
      
    }
    this.loadCat();
    
  }

  loadCat(){
    this._userService.getVehicleData(this.modelSelected, this.selectedColor, this.selectedPasajero, undefined).subscribe((response) =>{
      this.catalogo = response;
      console.log(response);
    });
  }

  Rentar(){
    this._userService.rentVehicle(this.user.user.id_user, this.vehicleModalData.data.id_vehicles, this.formDate(this.range.get('start').value), this.formDate(this.range.get('end').value), this.dias).subscribe((response) => {
      Swal.fire({
        title: "Rentado",
        text: "El vehículo ha sido rentado con éxito. Puedes ir a reservaciones para ver los detalles",
        icon: "success",
        footer: '<a href="/#/reserved" class="btn btn-primary">Ir a Reservaciones</a>',
        preConfirm: () => {
          Swal.close();
        },        
      });
      
      this.modalVehicle.close();
      this.loadCat();
      
    });
  }

  Reservar(){
    this._userService.reservateVehicle(this.user.user.id_user, this.vehicleModalData.data.id_vehicles, this.formDate(this.range.get('start').value), this.formDate(this.range.get('end').value), this.dias).subscribe((response) => {
      Swal.fire({
        title: "Reservado",
        text: "El vehículo ha sido reservado con éxito. Puedes ir a reservaciones para ver los detalles",
        icon: "success",
        footer: '<a href="/#/reserved" class="btn btn-primary">Ir a Reservaciones</a>',
        preConfirm: () => {
          Swal.close();
        },
      });
      this.modalVehicle.close();
      this.loadCat();
    });
  }


}
