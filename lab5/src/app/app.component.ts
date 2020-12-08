import { Component } from '@angular/core';
import { FirebaseService } from './services/auth.service';
import { SubjectService } from 'src/app/subject.service';
import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSignedIn = false
  isAdmin = false
  click = false;
  constructor(private subjectService: SubjectService, public firebaseService: FirebaseService) {

  }
  
  ngOnInit() {
    if (localStorage.getItem('user') != null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }
  async admin(){
    this.click = true;
  }
  async onSignup(email: string, password: string) {
    await this.firebaseService.signup(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }
  async onSignin(email: string, password: string) {

    await this.firebaseService.signin(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }
  async onSignadmin(email: string, password: string) {
    await this.firebaseService.signadmin(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true
      this.isAdmin = true
  }
  handleLogout() {
    this.isSignedIn = false
    this.isAdmin = false
  }
  listInfo = [];
  listDetail = [];

  search() {
    //console.log("AS");
    var sub = sanitize((<HTMLInputElement>document.getElementById("searchSub")).value)
    var code = sanitize((<HTMLInputElement>document.getElementById("searchCode")).value)
    var component = sanitize((<HTMLInputElement>document.getElementById("searchComp")).value)

    var subUpper = sub.toUpperCase();
    var codeUpper = code.toUpperCase();

    this.subjectService.onSearch(subUpper, codeUpper, component).subscribe((response: any) => {
      alert("Successfully Displayed Results for: " + subUpper + " " + codeUpper + " " + component);

      response.forEach(info => {
        //info["course_info"] = JSON.stringify(info["course_info"]);
        info["show"] = false;
        this.listInfo.push(info);
      })

      JSON.stringify(this.listInfo);

      console.log(JSON.stringify(this.listInfo));
    })
  }

  securityInfo=[]
  displaySecurity(){
    this.subjectService.displaySec().subscribe((response: any)=>{
      this.securityInfo= response;
    })
  }
  aupInfo=[]
  displayPolicy(){
    this.subjectService.displayAup().subscribe((response: any)=>{
      this.aupInfo= response;
    })
  }
  dmcaInfo=[]
  displayNotice(){
    this.subjectService.displayDmca().subscribe((response: any)=>{
      this.dmcaInfo= response;
    })
  }
  keys = [];
  searchKeyword() {
    var key = sanitize((<HTMLInputElement>document.getElementById("searchKey")).value)
    if (key.length < 4){
      alert("Keyword must be longer than 4 characters")
    }else{
    var keyUpper = key.toUpperCase();
    console.log(keyUpper);
    //JSON.stringify(keyUpper);
    this.subjectService.keyword(keyUpper).subscribe((response: any) => {
      alert("Successfully Displayed Results for: " + keyUpper);
      response.forEach(info => {
        //info["course_info"] = JSON.stringify(info["course_info"]);
        info["show"] = false;
        this.keys.push(info);
      })
    })}}

    validateEmail(email: string)
{
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(email.match(mailformat))
{
alert("Valid email address!");

return true;
}
else
{
alert("You have entered an invalid email address!");

return false;
}
}
}
function sanitize(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.toString().replace(reg, (match) => (map[match]));
}