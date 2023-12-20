import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule}  from '@angular/material/icon';
import { JsonPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { RegisterComponent } from './register/register.component';
import { ReservedComponent } from './reserved/reserved.component';
import { ProfileOurComponent } from './profile-our/profile-our.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        JsonPipe,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    declarations: [
        LoginComponent,
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        CatComponent, 
        RegisterComponent,
        ReservedComponent,
        ProfileOurComponent
    ]
})
export class ExamplesModule { }
