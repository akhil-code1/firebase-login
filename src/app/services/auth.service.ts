import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedin = false;

  user$: Observable<any>;
  userId: any;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
      public dialog: MatDialog,
      public snackbar: MatSnackBar
  ) {
     // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          this.userId = user.uid;          
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
   }

   async signup(data: any){
     let email = data.email;
     let password = data.password;
    await this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(res=>{
      this.isLoggedin = true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.snackbar.open('succesfully Signed up')
      return this.updateUserData(res.user, data);
      
    })
    .catch((err) => {
      this.dialog.open(DialogErrorComponent)
      
    })
   
  }

   async signin(data: any){
    let email = data.email;
    let password = data.password;
    await this.afAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.isLoggedin = true
      localStorage.setItem('user',JSON.stringify(res.user) )
      this.snackbar.open('succesfully logged in')
    })
    .catch((err) => {
      this.dialog.open(DialogErrorComponent)
      
    })
  }

   async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user:any,
     data1?:any
     ) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      role: data1.role,
      username: data1.username,
      phone_number: data1.phone_number,
      address: data1.address, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    } 

    
    return userRef.set(data, { merge: true })
    
  }
  updateNumber(data: any){
    console.log(data);
    console.log(this.userId);
    
    
    const userRef1: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userId}`);
    // userRef1.update({

    // })
  // return this.afs.collection("users").doc(user.uid).set({phone_number: data}, {merge: true})

  return userRef1.update({phone_number:data})
  // return userRef1.
    
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    localStorage.removeItem('user')
  }

  }
