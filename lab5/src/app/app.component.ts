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

  constructor(private subjectService: SubjectService, public firebaseService: FirebaseService) {

  }
  ngOnInit() {
    if (localStorage.getItem('user') != null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
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
  handleLogout() {
    this.isSignedIn = false

  }
  listInfo = [];
  listDetail = [];

  search() {
    //console.log("AS");
    var sub = sanitize((<HTMLInputElement>document.getElementById("searchSub")).value)
    var code = sanitize((<HTMLInputElement>document.getElementById("searchCode")).value)
    var component = sanitize((<HTMLInputElement>document.getElementById("searchComp")).value)

    var subUpper = sub.toUpperCase();

    this.subjectService.onSearch(subUpper, code, component).subscribe((response: any) => {
      alert("Successfully Displayed Results for: " + subUpper + " " + code + " " + component);

      response.forEach(info => {
        //info["course_info"] = JSON.stringify(info["course_info"]);
        info["show"] = false;
        this.listInfo.push(info);
      })

      /*for (let info in response) {
        console.log(info);
        //info["course_info"] = JSON.stringify(info["course_info"]);
        this.listInfo.push(response[info]);      
      }*/
      //this.listInfo=response;

      JSON.stringify(this.listInfo);

      console.log(JSON.stringify(this.listInfo));
    })
  }
  keys = [];
  searchKeyword() {
    var key = sanitize((<HTMLInputElement>document.getElementById("searchKey")).value)

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
    })}

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
