
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/auth.service';
import { SubjectService } from 'src/app/subject.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent {

  title = 'SE 3316 Lab 4';
  @Output() isLogout = new EventEmitter<void>()

  constructor(private subjectService: SubjectService, @Inject(DOCUMENT) document, public firebaseService: FirebaseService) { }

  refresh(): void {
    window.location.reload();
  }

  items = [];

  logout() {
    this.firebaseService.logout()
    this.isLogout.emit()
  }

  viewSubjects() {
    this.subjectService.viewSubject().subscribe((response: any) => {

      for (let subject in response) {
        this.items.push(response[subject]);
      }
      JSON.stringify(this.items);
      console.log(JSON.stringify(this.items));
    })
  }

  addCourses() {
    var sche = sanitize((<HTMLInputElement>document.getElementById("q5Schedule")).value)
    var sub = sanitize((<HTMLInputElement>document.getElementById("q5Subject")).value)
    var course = sanitize((<HTMLInputElement>document.getElementById("q5Course")).value)

    this.subjectService.addCourse(sche, sub, course).subscribe((response: any) => {
      alert("Successfully Added " + sub + " " + course + " to: " + sche);

    })
  }

  listOfCodes = [];

  listCodes() {
    var list = (<HTMLInputElement>document.getElementById("listCode")).value
    this.subjectService.list(list).subscribe((response: any) => {
      alert("Successfully Displayed All Course Codes for: " + sanitize(list));

      response.forEach(codes => {
        codes = JSON.parse(codes);
        this.listOfCodes.push(codes);
      })
      console.log(this.listOfCodes);
    })
  }

  addSchedule() {

    var add = (<HTMLInputElement>document.getElementById("scheduleInput")).value
    this.subjectService.addSche(add).subscribe((response: any) => {
      alert("Successfully Added a Schedule Named: " + sanitize(add));
      console.log(JSON.stringify(response));
    })
  }

  displayOne = [];
  displaySchedule() {
    var display = (<HTMLInputElement>document.getElementById("scheduleInput")).value

    console.log(display);

    this.subjectService.displaySche(display).subscribe((response: any) => {
      alert("Successfully Displayed: " + sanitize(display));
      for (let classes in response) {
        this.displayOne.push(response[classes]);
      }

    })
  }
  delSchedule() {
    var sche = (<HTMLInputElement>document.getElementById("scheduleInput")).value
    console.log(sche);
    this.subjectService.deleteSchedule(sche).subscribe((response: any) => {
      alert("Success!");

    })
  }

  viewSche = [];
  viewSchedule() {
    this.subjectService.viewSchedules().subscribe((response: any) => {
      console.log(response);


      for (let subject in response) {
        response[subject]["show"] = false;
        this.viewSche.push(response[subject]);
      }
      //JSON.stringify(this.viewSche);
      console.log(JSON.stringify(this.viewSche));
      console.log(JSON.stringify(response));
    })
  }
  toggleFlag(schedule){
    
    this.subjectService.toggleVisible(schedule).subscribe((response: any )=>{
      return null;
    })
  }
  deleteAll() {
    this.subjectService.delete().subscribe((response: any) => {
      console.log("yes");
    })
  }
  addReview() {
    var courseId = (<HTMLInputElement>document.getElementById("reviewCourse")).value
    var review = (<HTMLInputElement>document.getElementById("reviewText")).value
    this.subjectService.addRev(courseId, review).subscribe((response: any) => {
      alert("Success!!!");
  })

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

