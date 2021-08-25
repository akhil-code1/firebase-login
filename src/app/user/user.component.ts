import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor( public auth : AuthService,
                public route: Router) { }

  ngOnInit(): void {
    console.log(this.auth.user$);
    
  }

  changeNum(d: any){
    let userd;
    this.auth.user$.subscribe(user => user);
    
    
    // console.log(userId);
    // let user = localStorage.getItem('user')
    this.auth.updateNumber(d.value)
  }
}
