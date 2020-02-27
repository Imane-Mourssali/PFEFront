import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Injectable} from "@angular/core";
import {OperationModel} from "../models/operation.model";


@Injectable()
export class OperationService {


    public host:string="http://localhost:8087";

    constructor(private http: HttpClient) { }

 /*   public getResource(url){
        return this.http.get(url);
    }
*/

    public getOperationsList(): Observable<OperationModel[]> {
        return this.http.get<OperationModel[]>(this.host+'/operations' );

    }

    public getOperationsByCode(code: string) : Observable<any>{

        return this.http.get( this.host+'/operations/search/findOperationsByCompte_CodeCompte?code=' +  code)

    }
    public verserMontant(CodeCompte: string,montant:number) : Observable<any> {
        return this.http.get(this.host+'/operations/verser/'+CodeCompte+'/'+montant)
            }
    public retirerMontant(CodeCompte: string,montant:number) : Observable<any> {
        return this.http.get(this.host+'/operations/retrait/'+CodeCompte+'/'+montant)
    }
    public virement(CodeCompte1: string,CodeCompte2: string,montant:number) : Observable<any> {
        return this.http.get(this.host+'/operations/virement/'+CodeCompte1+'/'+CodeCompte2+'/'+montant)
    }
}
