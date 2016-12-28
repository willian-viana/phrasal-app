import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/get-verbs.service';

@Component({
    selector: 'search-verb-app',
    templateUrl: './app.search-verbs.html',
})

export class searchVerbs implements OnInit {
    getData : string;
    verbsBox : string;
    verbs : Array<Object>;
    
    constructor(private _http : HttpService){}
    
    ngOnInit(){
        this._http.getVerbsHTTP()
        .then(data => {
            this.verbs = JSON.parse(data._body); 
            console.log('XPTO 2', data)
            console.log('LET VERBS:', this.verbs)})
        .catch(err => console.log(err))    
    }

    getVerbs(){
        this._http.getVerbsHTTP()
        .then(data => {
            this.verbs = data._body; 
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