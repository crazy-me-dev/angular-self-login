//import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { LinkService } from '../link.service';
import { User } from '../User';
import { Http, Response, Headers } from '@angular/http';
import { error } from 'util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [LinkService]
})
export class SignupComponent implements OnInit {
  //constructor(private router: Router) { }
  _model = new User();
  constructor(private linkservice: LinkService,private router: Router,){

  }
  ngOnInit() {

  }

  onFormSubmit(form) {
    //this.router.navigateByUrl('/');
    console.log(form.value)
    this.linkservice.saveuser(form.value).subscribe(result=>{
      if(result){
        sessionStorage.setItem('token', JSON.stringify(result));
        console.log("++++++++++")
        console.log(result)
        console.log("++++++++++")
        alert('success')
        this.router.navigateByUrl('/login');
      }

    },error => {
      if(error.status == 302){
        alert(error.error)

      }else{
        alert('Error occured')
      }
    });
  }
}
