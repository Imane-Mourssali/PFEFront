import { Component, OnInit } from '@angular/core';
import {AccountService} from "./service/account.service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {AccountModel} from "./models/account.model";
import {OperationModel} from "./models/operation.model";
import {OperationService} from "./service/operation.service";
import {KeycloakSecurityService} from "../../services/keycloak-security.service";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    data;
    account;
    operations;
    operationVerser;
    operationRetrait;
    CodeCompte: string;
    montant: number;
   code:boolean;
   compteCourant : AccountModel;
    compteEpargne : AccountModel;
    courant:boolean;
    epargne:boolean;
    versement:boolean;
    retrait:boolean;
    selectedValue;
    isButtonVisible:boolean
    codeCompte2;
    isAdmin:boolean;
  constructor(private router: Router,
              private accountService: AccountService,
              private operationsService: OperationService,public securityService:KeycloakSecurityService) {

      this.compteCourant = new AccountModel();
     this.compteEpargne =new AccountModel();


  }
 
  ngOnInit() {
    
    this.code=false;
    this.courant=false;
    this.epargne=false;
    this.retrait=false;
    this.versement=false;
    this.isButtonVisible=false;
    this.isAdmin = this.securityService.kc.hasResourceRole("admin")
  }


    ShowAccount(){
     this.code=true;
    // console.log(this.CodeCompte);
        this.accountService.getAccountByCode(this.CodeCompte).subscribe(res => {
               this.account = res
               var keys = Object.keys(this.account)
          //  console.log(keys[4])
            if(keys[4]=="decouvert"){
                this.compteCourant = this.account
                this.epargne = false
                this.courant = true
            }else{
                this.compteEpargne = this.account
                this.epargne = true
                this.courant = false
            }
        });

      this.operationsService.getOperationsByCode(this.CodeCompte).subscribe(res=> {
          this.operations= res
          //console.log("operatiooons : "+this.operations)
          var keys = Object.keys(this.operations._embedded)
       //   console.log(keys[0])
          if(keys[0] == "versements")
          {
              this.versement=true
             // this.retrait=false
              this.operationVerser = this.operations._embedded.versements

            //  this.ShowAccount()
          }
          if(keys[1] =="retraits" ){
             // this.versement=false
              this.retrait=true
              this.operationRetrait = this.operations._embedded.retraits
              //this.ShowAccount()

          }
          if(keys[0] =="retraits"){
              this.versement=false
              this.retrait=true
              this.operationRetrait = this.operations._embedded.retraits
          //    this.ShowAccount()
          }
      })
    }


    onItemChange(event : any){
        console.log(" Value is : ", event.target.value );
        this.selectedValue = event.target.value;
        if(this.selectedValue == "virement"){
            this.isButtonVisible=true;
        }
        else {
            this.isButtonVisible=false;
        }
    }
    Save(){
        console.log(this.montant)
        if(this.selectedValue == "versement"){
            this.operationsService.verserMontant(this.CodeCompte,this.montant).subscribe(res=> {
                console.log(res)
            });

        }
        if(this.selectedValue == "retrait"){
            this.operationsService.retirerMontant(this.CodeCompte,this.montant).subscribe(res=> {
                console.log(res)
            });
        }
        if(this.selectedValue=="virement"){
           this.operationsService.virement(this.CodeCompte,this.codeCompte2,this.montant).subscribe(res=> {
               console.log(res)
           });
        }
       // location.reload()
    }
    onLogout() {
        this.securityService.kc.logout()

    }

    onLogin() {
        this.securityService.kc.login();
    }

    onChangePassword() {
        this.securityService.kc.accountManagement();
    }
}
