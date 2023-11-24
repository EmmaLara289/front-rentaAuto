import { Component, OnInit } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/components/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    user : User;
    test : Date = new Date();
    focus;
    focus1;

  constructor(
    private _userService : UserService,
  ) { 
    this.user = new User(1, '', '', '', '', 1);
  }

  ngOnInit(){

  }

  login() {
    this._userService.login(this.user.email, this.user.password).subscribe(
      response => {
        if (response.status != 'error') {
         console.log("Funciona");
        }
        /*
        setTimeout(function() {
          window.location.href = window.location.href;
          // Puedes colocar aquí el código que deseas ejecutar después de 3 segundos
        }, 3000); // 3000 milisegundos (3 segundos)
       */
        
      },
      error => {
        console.log("No funciona");
      }
    );
  }

}
