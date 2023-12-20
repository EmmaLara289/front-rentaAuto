import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'app/components/models/user';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-our',
  templateUrl: './profile-our.component.html',
  styleUrls: ['./profile-our.component.scss']
})
export class ProfileOurComponent implements OnInit {

  user: any;
  user_data_files: any;

  constructor(
    private _userService : UserService,
    private _router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);

    this._userService.getUserData(this.user.user.id_user).subscribe((response) => {
      this.user_data_files = response;
      console.log(this.user_data_files);
    });
  }

}
