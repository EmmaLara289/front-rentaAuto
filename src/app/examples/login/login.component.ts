import { Component, OnInit } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

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
    private _router: Router,
  ) { 
    this.user = new User(1, '', '', '', '', 1, "", "", "", "");
  }

  ngOnInit(){

  }

  login() {
    this._userService.login(this.user.email, this.user.password).subscribe(
      response => {
        if (response.status != 'error') {
         console.log("Funciona");
         this._router.navigate(['/cat']);
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
        Swal.fire('UPS', 'El usuario no se ha podido identificar.', 'error');
      }
    );
  }

}
