import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OperationsService {
    public host: String= 'http://localhost:8087'
    constructor(private http: HttpClient) { }

    getAllOperations() {
        return this.http.get(this.host + '/operations');
    }
}
