import { Component, OnInit } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
  user: User;
  reserved: any;

  constructor(
    private _userService : UserService,
    private _router: Router,
  ) { 
    this.user = new User(1, '', '', '', '', 1, "", "", "", "");
  }


  ngOnInit(){

    this._userService.getProcess(1).subscribe((response) => {
      this.reserved = response;
      console.log(response);
    });
  }

}
