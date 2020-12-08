import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { RegisterComponentComponent } from './register-component/register-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { FirebaseService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponentComponent,
    UserComponentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({apiKey: "AIzaSyCiSvdE9q3bRWKlrSsticeM1CClF2z8Uy8",
    authDomain: "testing-e68d8.firebaseapp.com",
    projectId: "testing-e68d8",
    storageBucket: "testing-e68d8.appspot.com",
    messagingSenderId: "109357229598",
    appId: "1:109357229598:web:93a7ec2bfb448da6e7300f"}),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
