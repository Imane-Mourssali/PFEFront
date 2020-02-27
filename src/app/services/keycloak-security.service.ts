import {Injectable} from "@angular/core";


declare let Keycloak:any;

@Injectable({
    providedIn:'root'
})
export class KeycloakSecurityService{
    public kc;
    constructor(){

    }
   init(){
        return new Promise((resolve,reject)=>{
          //  console.log("Security Initialisation ....")
            this.kc = new Keycloak({
                url:"http://localhost:8080/auth",
                realm:"E-Wallet",
                clientId:"PFE-AppFrontEnd",

            });
            this.kc.init({
                onLoad:'check-sso',
                // onLoad:'login-required',
                promiseType:'native'
            }).then((authenticated)=>{
                resolve({auth:authenticated,token:this.kc.token});
            }).catch(err=>{
                reject(err);
            });
        })


    }
  /*  public isAdmin():boolean{
       return this.kc.hasResourceRole("admin");
    }*/

}