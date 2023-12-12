import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { RegisterComponent } from './register/register.component';
import { ReservedComponent } from './reserved/reserved.component';

import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
        MatNativeDateModule
    ],
    declarations: [
        LoginComponent,
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        CatComponent, 
        RegisterComponent,
        ReservedComponent
    ]
})
export class ExamplesModule { }
