import { Component } from '@angular/core';
import { HttpService } from '../../services/get-verbs.service';

@Component({
    selector: 'search-verb-app',
    templateUrl: './app.search-verbs.html',
})

export class searchVerbs{
    getData : string;
    verbsBox : string;
    
    constructor(private _http : HttpService){}

    getVerbs(){
        this._http.getVerbsHTTP()
        .then(data => {
            this.getData = data._body; 
            console.log('XPTO 2', data)})
        .catch(err => console.log(err))    
    }

    getVerbsID(text){
        this._http.getVerbsByID(text)
        .then(data => {
            this.verbsBox = data;
            console.log(data); 
        })
    }
}