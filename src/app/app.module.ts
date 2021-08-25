import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Firebase imports 

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent} from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { UserComponent } from './user/user.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// firebase credentials
const config = {
  apiKey: "AIzaSyCEtRRGJ47pTc4YOLvZa_KLCmGQ2hZj7gc",
  authDomain: "login-301c8.firebaseapp.com",
  projectId: "login-301c8",
  storageBucket: "login-301c8.appspot.com",
  messagingSenderId: "985404476429",
  appId: "1:985404476429:web:5e63c0bdf5ac51dd221944"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DialogErrorComponent
    
  ],
  entryComponents: [DialogErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  

    // Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, BrowserAnimationsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}) // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
