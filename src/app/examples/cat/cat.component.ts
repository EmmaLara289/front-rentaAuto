import { Component, OnInit, TemplateRef, inject  } from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {

  selectedModel: string;
  models: any;
  modalVehicle: any;
  fecha_inicio: Date;
  fecha_final: Date;
  catalogo: any;
  vehicleModalData: any;
  dias: number;

  zoom = 15;
  lat = 37.7749; // Latitud de San Francisco como ejemplo
  lng = -122.4194; // Longitud de San Francisco como ejemplo

  // Clave de la API de Google Maps
  googleMapsApiKey = environment.googleMapsApiKey;
  
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
      this.dias = response;
    })

    // Puedes agregar tu lógica aquí para manejar el rango de fechas seleccionado
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
    console.log('Modelo seleccionado:', this.selectedModel);

    // Puedes agregar tu lógica aquí para realizar algo cuando se seleccione una opción
  }

}
