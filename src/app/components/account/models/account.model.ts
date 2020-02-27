import {ClientModel} from "./client.model";

export class AccountModel {

    idCompte: string;
    codeCompte: string;
    dateCreation: string;
    solde: number;
    decouvert:string;
    taux:string;
    client:ClientModel;

    constructor() {
        this.client = new ClientModel();

    }

}
