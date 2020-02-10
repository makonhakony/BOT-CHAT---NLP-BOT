import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { AppService } from './app.service'
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private appservice :AppService
    
  ){
  }
  recognizing:any;
  recognition:any;
  
  
  private _hubConnection: HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];
  result: any;

  location:string;
  datetime:string;
  type:string;
  flag:boolean;
  public sendMessage(): void {
    
    console.log('msg:',this.message)
    this.appservice.getInfo(this.message).subscribe((result:any) =>{
      
      this.result=  result
      this.flag = true;
      console.log(this.result)
      if(this.result.entities.eat){
      
        console.log('eat confi: ',this.result.entities.eat[0].confidence)
        
        this.location = this.result.entities.location[0].value
        this.datetime = this.result.entities.datetime[0].value
        this.type = 'eat'
        
      }
      else if (this.result.entities.event) {
        
        console.log('event confi: ',this.result.entities.event[0].confidence)
        this.location = this.result.entities.location[0].value
        this.datetime = this.result.entities.datetime[0].value
        this.type = 'event'

      }
      else if (this.result.entities.hotel){
        console.log('stay confi: ',this.result.entities.hotel[0].confidence)
        this.location = this.result.entities.location[0].value
        this.datetime = this.result.entities.datetime[0].value
        this.type = 'hotel'
      }
      else this.flag=false;
      
    });
    

    this._hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .then(() => {
        this.message = '',
        //this.responseReq(this.location,this.datetime)
        setTimeout(()=>{ this.responseReq(this.location,this.datetime) }, 5000)
      })
      .catch(err => console.error(err));
  }

  ngOnInit() {
    this.nick = window.prompt('Your name:', 'Hoàng An');

    this._hubConnection = new HubConnection('http://localhost:5000/chat');

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      this._hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
        const text = `${nick}: ${receivedMessage}`;
        this.messages.push(text);
      });
      this.initVoiceSearch()
    }

    initVoiceSearch() {
      this.recognizing=false
      const {webkitSpeechRecognition} : IWindow = <IWindow>window;
      this.recognition = new webkitSpeechRecognition()
      //format recognition
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = "vi-VN";
      console.log(this.recognition);
      console.log(this.recognition.lang);
    
      //----------Recognition function----------
      this.recognition.onerror = event => {
        console.log(event);
        if (event.error === "no-speech") this.recognizing = false;
        if (event.error === "language-not-supported") this.recognition.lang = "";
        if (event.error === "not-allowed") alert("cannot use your microphone!");
      };
    
      this.recognition.onend = () => {
        console.log("stop recognizing");
        //document.getElementById('#message'). = this.result;
        console.log(this.result)
      };
    
      this.recognition.onresult = event => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.result = event.results[i][0].transcript;
            console.log("result: ", this.result);
          } else {
            console.log(event.results[i][0].transcript);
          }
        }
      };
    }
  toggleStartStop() {
      console.log(this.recognizing)
      if (this.recognizing) {
        this.recognition.stop();
        this.message=this.result
        this.sendMessage()
       
        this.recognizing = false;
      } else {
        console.log("start recognizing");
        this.recognition.start();
        this.recognizing = true;
      }
    }
  responses:string[] = []
  responseReq(location:any,datetime:any){
      if (this.responses != null){
        this.responses.pop();
      }
      if (this.flag ==true)
      this.responses.push('https://localhost:44313/?term='+location+'+'+datetime+'+'+this.type);
      else this.responses.push('I dont undetstand what you said')
  }
    
    
}
