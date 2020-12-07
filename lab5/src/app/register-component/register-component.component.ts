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
  ngOnInit(): void {
  }

}
