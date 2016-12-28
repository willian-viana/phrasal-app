import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import * as _ from 'lodash';


import 'rxjs/add/operator/toPromise';

@Injectable()

export class HttpService{

    constructor(private http: Http) { }

    getVerbsHTTP(){
        return this.http.get('http://localhost:3000/api/v1/verbs/')
            .toPromise()
            .then()
            .catch(this.handleError);
    }

    getVerbsByID(verb){
        return this.http.get('http://localhost:3000/api/v1/verbs/' + verb)
            .toPromise()
            .then()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}