import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'search-verb-app',
    templateUrl: './app.search-verbs.html'
})

export class searchVerbs{

    constructor(private http: Http) { }

    getVerbs(): Promise<string>{
        return this.http.get('localhost:3000/api/v1/verbs/')
                .toPromise()
                .then(response => response.json().data as string)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}