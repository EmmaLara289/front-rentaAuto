import { Component, OnInit } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/components/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    user : User;
    keyFoto: any;
    id_back: any;
    id_front: any;
    licencia: any;
    profile_pic: any;

  constructor(
    private _userService : UserService,
    private _router: Router,
  ) { 
    this.user = new User(1, '', '', '', '', 1);
  }

  ngOnInit(){

  }

  foto(files: FileList, number: number){
    this.handleFileInput(files, number);
    //this.handleFileInputURL(files);
  }

/*  fotoUpdate(files: FileList){
    this.handleFileInputUpdate(files);
    this.handleFileInputURLUpdate(files);
  }
  */

  handleFileInput(files: FileList, number: number) {
    
    switch ( number ) {
      case 1:
        this.profile_pic = files.item(0);
        console.log(this.profile_pic);
        break;

      case 2:
        this.id_front = files.item(0);
        console.log(this.id_front);
        break;
      case 3:
        this.id_back = files.item(0);
        console.log(this.id_back);
        break;
      case 4:
        this.licencia = files.item,(0);
        console.log(this.licencia);
        break;
      default: 
          // 
          break;
   }
  }

  handleFileInputURL(files: FileList) {
    const file = files.item(0);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const dataUrl = e.target.result as string;
  
        // Generar una clave única para identificar la imagen en localStorage
        const uniqueKey = 'foto_' + new Date().getTime();
  
        // Guardar la URL de datos en localStorage
        sessionStorage.setItem(uniqueKey, dataUrl);
  
        // Almacena la clave única en tu objeto colaborador
        this.keyFoto = uniqueKey;
      };
  
      reader.readAsDataURL(file);
    }
  }
/*
  handleFileInputUpdate(files: FileList) {
    this.colaboradorCopy.foto = files.item(0);
    console.log('Listo');
    this.fotoAlertUpdate = false;
  }
*/
  handleFileInputURLUpdate(files: FileList) {
    const file = files.item(0);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const dataUrl = e.target.result as string;
  
        // Generar una clave única para identificar la imagen en localStorage
        const uniqueKey = 'foto_' + new Date().getTime();
  
        // Guardar la URL de datos en localStorage
        sessionStorage.setItem(uniqueKey, dataUrl);
  
        // Almacena la clave única en tu objeto colaborador
        this.keyFoto = uniqueKey;
      };
  
      reader.readAsDataURL(file);
    }
  }

  getFotoUrl() {
    // Obtén la clave única almacenada en this.colaborador.fotoKey
    const uniqueKey = this.keyFoto;
  
    if (uniqueKey) {
      // Obtén la URL de datos desde localStorage
      const dataUrl = sessionStorage.getItem(uniqueKey);
  
      // Devuelve la URL de datos
      return dataUrl;
    }
  
    // Si no hay clave única, devuelve una URL de imagen predeterminada o una URL vacía según tu necesidad
    return 'URL_de_imagen_predeterminada.jpg'; // Cambia esto según tu caso
  }

  getFotoUrlUpdate() {
    // Obtén la clave única almacenada en this.colaborador.fotoKey
    const uniqueKey = this.keyFoto;
  
    if (uniqueKey) {
      // Obtén la URL de datos desde localStorage
      const dataUrl = sessionStorage.getItem(uniqueKey);
  
      // Devuelve la URL de datos
      return dataUrl;
    }
  
    // Si no hay clave única, devuelve una URL de imagen predeterminada o una URL vacía según tu necesidad
    return 'URL_de_imagen_predeterminada.jpg'; // Cambia esto según tu caso
  }
  

}
