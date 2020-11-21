import { Component } from '@angular/core'; 
import { NavigationComponent } from './navigation.component';
import{ AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  //template: ` <nav></nav>
 // <router-outlet></router-outlet>`
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.css']
})
export class AppComponent {
  router: string;
  constructor( private auth: AuthService , private route:Router){
   

  }

  //@ViewChild(PlannerComponent) planner :PlannerComponent;
  //@ViewChild(PlannerComponent) plan  : PlannerComponent; 
  //title = 'NADA PLANNER';
   


 /* onPosted(plan){ (onPosted)="onPosted($event)
     this.plan.planner.push(plan);
    this.plan.planner.push(plan);
    console.log(plan);
  }*/
}
