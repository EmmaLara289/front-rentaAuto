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
  fechaActual: Date = new Date();
  modelSelected: any;
  colores: any;
  pasajeros: any;
  selectedColor: any;
  selectedPasajero: any;

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
  }

  openModalApart(item, dialog:TemplateRef<any>) {
    this.modalApart = this.modalService.open(dialog, {size: 'sm'});
    this.vehicleModalData = item;
    this.calculateRent();
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
      });
    }else{
      this.modelSelected = undefined;
    }
    
    this.loadCat();
    //if(event)
    // Puedes agregar tu lógica aquí para realizar algo cuando se seleccione una opción
  }

  selectColor(event: any) {
    // `event` contiene información sobre el cambio de selección, si es necesario
    console.log('Modelo seleccionado:', event);

    if(event.value === "undefined"){

      this.modelSelected = undefined;

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


}
