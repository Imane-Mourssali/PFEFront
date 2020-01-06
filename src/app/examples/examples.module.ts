import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import {RouterModule} from '@angular/router';
import {AccountComponent} from '../components/account/account.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
    ],
    declarations: [
        LandingComponent,
        ProfileComponent,
    ]
})
export class ExamplesModule { }
