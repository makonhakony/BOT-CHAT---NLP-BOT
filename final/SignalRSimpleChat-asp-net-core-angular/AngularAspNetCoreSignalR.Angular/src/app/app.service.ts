import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer OMNQNZSW7CCEAY6YLSIMPFUIJIDYJ46E'
    }),
    
  };
@Injectable()
export class AppService {
  constructor (
    private http: HttpClient
  ) {}

  a:any
  getInfo(query:string) {
    console.log(query)
    this.a=this.http.get('https://api.wit.ai/message?',{
        headers: {           
            'Authorization': 'Bearer S6HXFXSGMJYX4FFZAPHDAT55Q53FCRYF'
          },
        params:{
            v:'20200108',
            q:query
        }
    });
    console.log(this.a)
    return this.a;

  }

}