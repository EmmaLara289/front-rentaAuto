import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule
    ],
    declarations: [
        LoginComponent,
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        CatComponent, 
        RegisterComponent
    ]
})
export class ExamplesModule { }
