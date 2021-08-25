import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test2';

  constructor(private db: AngularFirestore,
              public auth: AuthService){
    const things = db.collection('things').valueChanges();
    things.subscribe(console.log)
  }


}
