import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule} from '@angular/material/button';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatButtonModule
    ],
    declarations: [
        LoginComponent,
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        CatComponent
    ]
})
export class ExamplesModule { }
