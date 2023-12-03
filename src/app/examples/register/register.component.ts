import { Component, OnInit } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/services/user.service';
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
    licencia_front: any;
    licencia_back: any;
    profile_pic: any;
    user_telefono: any;
    user_card: any;
    user_cvv: any;
    user_fecha_vencimiento: any;
    register_modal = 1;

  constructor(
    private _userService : UserService,
    private _router: Router,
  ) { 
    this.user = new User(1, '', '', '', '', 1, "", "", "", "");
  }

  ngOnInit(){

  }

  registrerUser(){
    this._userService.register(this.user.name, this.user.email, this.user.password, this.user.telefono, this.id_front, this.id_back, this.licencia_front, this.licencia_back, this.profile_pic, this.user.card, this.user.cvv, this.user.fecha_vencimiento).subscribe((response)=>{
      console.log("ola");
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500        
      });
      this._router.navigate(['/login']);
    },
    (error) => {
      // Manejar el error, por ejemplo, si recibes un código de estado 400
      if (error.status === 400) {
        
        // Realiza acciones específicas para el error 400
        console.log(error.error);
        Swal.fire('UPS', 'Por favor, rellene todos los campos', 'error');
        // Puedes mostrar un mensaje de error, etc.
      } else {
        // Otros códigos de error
        console.error("Otro error:", error);
      }
    }
    );
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
        this.licencia_front = files.item(0);
        console.log(this.licencia_front);
        break;
      case 5:
        this.licencia_back = files.item(0);
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

  next(){

    if(this.register_modal < 3){
    this.register_modal++;
    }

  }

  preview(){
    
    if(this.register_modal > 1){
      this.register_modal--;
    }

  }

  fecha_complete(){
    if(this.user.fecha_vencimiento.length === 2){
      this.user.fecha_vencimiento += "/";
    }
    console.log(this.user.fecha_vencimiento.length);
  }

  handleKeyDown(event: KeyboardEvent) {
    console.log(this.user.fecha_vencimiento.length);
    console.log(event);
    if (event.key === 'Backspace' && this.user.fecha_vencimiento.length === 3) {
        // La tecla "Delete" fue presionada y la longitud de la cadena es igual a 3
        // Borra el último carácter de la cadena
        this.user.fecha_vencimiento = this.user.fecha_vencimiento.slice(0, -1);
    }
}

  

}
