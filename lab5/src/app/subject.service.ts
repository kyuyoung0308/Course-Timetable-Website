import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const ip = window.location.href.substr(0, window.location.href.length -1)
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url: string = ip + ':3000/api'

  constructor(private http: HttpClient) {

  }

  onSearch(subject, course, component) {
    console.log(`${this.url}/question3/` + subject + `/` + course+`/`+component);
    return this.http.get(`${this.url}/question3/` + subject + `/` + course+`/`+component);
  }

  addCourse(schedule, subject, course) {

    var sanSchedule = sanitize(schedule);
    
    var pair = [{
      "subject": `${subject}`,
      "catalog_nbr": `${course}`
    }]
    var body = pair

    console.log(JSON.stringify(pair));

    return this.http.put(`${this.url}/question5/newcourse/` + sanSchedule, body, httpOptions)
  }

  addSche(schedule) {
    var san = sanitize(schedule);
    return this.http.put(`${this.url}/question4/new/` + san, httpOptions)
  }

  list(subject) {
    var san = sanitize(subject);
    return this.http.get(`${this.url}/question2/` + san)
  }

  displaySche(schedule) {
    var san = sanitize(schedule)
    return this.http.get(`${this.url}/question6/courselist/` + san)
  }

  viewSubject() {
    //we want to send a web request to display list
    console.log(this.url.toString());
    return this.http.get(`${this.url}/question1/subjects`);
  }

  viewSchedules() {
    console.log(this.url);
    return this.http.get(`${this.url}/question8/allschedules/list`);

  }
  deleteSchedule(schedule) {
    var san = sanitize(schedule);
    return this.http.delete(`${this.url}/question7/deleteschedule/` + san);
  }
  delete() {
    return this.http.delete(`${this.url}/question9/delete/all/schedules`);
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

