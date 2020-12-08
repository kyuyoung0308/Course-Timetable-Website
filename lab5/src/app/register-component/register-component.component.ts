import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { FirebaseService } from '../services/auth.service';
import { SubjectService } from 'src/app/subject.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

 
  @Output() isLogout = new EventEmitter<void>()
  
  constructor(private subjectService: SubjectService, @Inject(DOCUMENT) document, public firebaseService: FirebaseService) { }

  logout() {
    this.firebaseService.logout()
    this.isLogout.emit()
  }
  
  security(){
    var sec = (<HTMLInputElement>document.getElementById("security")).value
    this.subjectService.updateSecurity(sec).subscribe((response: any) => {
      alert("Successfully updated");

    })
  }

  aup(){
    var aup = (<HTMLInputElement>document.getElementById("aup")).value
    this.subjectService.updateAup(aup).subscribe((response: any) => {
      alert("Successfully updated");

    })
  }

  revArray =[]
  review(){
    this.subjectService.viewReview().subscribe((response: any) => {
        this.revArray = response;
    })
  }
  courseToggle(course){
    this.subjectService.toggleCourse(course).subscribe((response: any )=>{
      return null;
    })
  }
  
  dmca(){
    var dmca = (<HTMLInputElement>document.getElementById("dmca")).value
    this.subjectService.updateDmca(dmca).subscribe((response: any) => {
      alert("Successfully updated");

    })
  }
  
  ngOnInit(): void {
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
