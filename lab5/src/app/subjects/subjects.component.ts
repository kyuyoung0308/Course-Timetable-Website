import { Component, OnInit } from '@angular/core';
import {Course} from '../course'
import { SubjectService} from 'src/app/subject.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})


export class SubjectsComponent implements OnInit {   

  items =[];


  viewSubjects(){
    this.subjectService.viewSubject().subscribe((response: any) =>{

    for (let subject in response){
      this.items.push(response[subject]);
    }
    JSON.stringify(this.items);
    console.log(JSON.stringify(this.items));
    })
  }
  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  

}
