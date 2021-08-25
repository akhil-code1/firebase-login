import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;
  selectedIndex = 0;
  constructor(public auth: AuthService,
              public afauth: AngularFireAuth,
              public route: Router) { }
  
  ngOnInit(): void {
   
    if(localStorage.getItem('user')!== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false
  }
  registrationForm = new FormGroup({
    uid: new FormControl(''),
    username: new FormControl('', Validators.required),
    email: new FormControl('',  [Validators.required , Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl(''),
    address: new FormControl(''),
    phone_number: new FormControl('', [ 
      Validators.required,
       Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern("[7-9]{1}[0-9]{9}"),])

    
  })

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSignup(){
  let data = this.registrationForm.value;
  this.auth.signup(data);
  this.isSignedIn = true;
  console.log(data.role);
  this.route.navigate(['user'])
   

}

onSignin(){
  let data = this.signInForm.value;
  this.auth.signin(data);
  if(this.auth.user$){

    this.isSignedIn = true;
  }
  this.route.navigate(['user'])

}



  

}
