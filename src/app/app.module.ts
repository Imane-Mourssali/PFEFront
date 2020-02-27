import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule} from 'keycloak-angular';

import { AccountComponent } from './components/account/account.component';
import {AccountService} from "./components/account/service/account.service";
import {OperationService} from "./components/account/service/operation.service";
import {KeycloakSecurityService} from "./services/keycloak-security.service";
import {RequestInterceptorService} from "./services/request-interceptor.service";

/*export function  kcFactory(kcSecurity:KeycloakSecurityService){
  return()=>kcSecurity.init();
}*/

const secService = new KeycloakSecurityService();

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
      AccountService,
      OperationService,
      {
        provide:KeycloakSecurityService,
        useValue:secService
      },
     /* {
    provide: APP_INITIALIZER,
    useFactory: kcFactory,
    deps: [KeycloakSecurityService],
    multi: true
  },*/
   {
     provide:HTTP_INTERCEPTORS,
     useClass:RequestInterceptorService,
     multi:true,
   }  ],
    entryComponents:[AppComponent]
 /* bootstrap: [AppComponent]*/
})
export class AppModule implements DoBootstrap{
    ngDoBootstrap(appRef: ApplicationRef): void {
    secService.init().then(res=>{
      console.log(res);
      appRef.bootstrap(AppComponent)
    }).catch(err=>{
      console.log(err);
    })
    }
}
