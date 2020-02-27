import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';


import {Injectable} from "@angular/core";
import {KeycloakSecurityService} from "../../../services/keycloak-security.service";


@Injectable()
export class AccountService {

  //  public currentPharmacie;
    public host:string="http://192.168.1.112:8087";

    constructor(private http: HttpClient) { }

/*    public getResource(url){
        return this.http.get(url);
    }*/


 /*   public getAccountList() {
        return this.http.get(this.host+'/comptes' );

    }*/

    public getAccountByCode(code: string){

        return this.http.get( this.host+'/comptes/search/findByCodeCompte?code=' +  code)

    }



}
