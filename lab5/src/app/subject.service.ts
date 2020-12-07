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

  url: string = "http://localhost" + ':3000/api'

  constructor(private http: HttpClient) {

  }

  onSearch(subject, course, component) {
    console.log(`${this.url}/question3/` + subject + `/` + course+`/`+component);
    if(course === ""){
      return this.http.get(`${this.url}/question3/` + subject);
    }
    else
      return this.http.get(`${this.url}/question3/` + subject + `/` + course+`/`+component);
  }

  addCourse(schedule, subject, course) {

    var sanSchedule = sanitize(schedule);
    var mail = JSON.parse(localStorage.user).email;
    var userName = mail.split("@");
    
    var pair = [{
      "subject": `${subject}`,
      "catalog_nbr": `${course}`
    }]
    var body = pair

    console.log(JSON.stringify(pair));

    return this.http.put(`${this.url}/create/newcourse/` + sanSchedule +`/`+userName[0], body, httpOptions)
  }

  addSche(schedule) {
    var san = sanitize(schedule);
    var mail = JSON.parse(localStorage.user).email;
    var userName = mail.split("@");

    return this.http.put(`${this.url}/authentic/new/` + san+'/'+ userName[0], httpOptions)
  }


  list(subject) {
    var san = sanitize(subject);
    return this.http.get(`${this.url}/question2/` + san)
  }

  displaySche(schedule) {
    var san = sanitize(schedule)
    var mail = JSON.parse(localStorage.user).email;
    var userName = mail.split("@");
    return this.http.get(`${this.url}/authcourse/courselist/` + san+'/'+userName[0])
  }

  viewSubject() {
    //we want to send a web request to display list
    console.log(this.url.toString());
    return this.http.get(`${this.url}/question1/subjects`);
  }

  viewSchedules() {
    var mail = JSON.parse(localStorage.user).email;
    var userName = mail.split("@");
    return this.http.get(`${this.url}/authall/allschedules/list`+'/'+userName[0]);

  }
  deleteSchedule(schedule) {
    var san = sanitize(schedule);
    var mail = JSON.parse(localStorage.user).email;
    var userName = mail.split("@");
    return this.http.delete(`${this.url}/users/deleteschedule/` + san+'/'+userName[0]);
  }
  delete() {
    return this.http.delete(`${this.url}/question9/delete/all/schedules`);
  }
  addRev(courseId, review){
    var sanCourse = sanitize(courseId);
    var sanReview = sanitize(review);
    var mail = JSON.parse(localStorage.user).email;
    var userName = mail.split("@");
    
    var pair = [{
      "catalog_nbr": `${sanCourse}`,
      "review": `${sanReview}`
    }]
    var body = pair

    console.log(JSON.stringify(pair));

    return this.http.put(`${this.url}/create/newcourse/` + sanCourse +`/`+userName[0], body, httpOptions)
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

