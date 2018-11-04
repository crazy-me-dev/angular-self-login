import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../link.service';
import { User } from '../User';
import { Http, Response, Headers } from '@angular/http';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LinkService]
})
export class LoginComponent implements OnInit {

  constructor(private linkservice: LinkService, private router: Router, private socialAuthService: AuthService ) { }

  

  ngOnInit() {
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }else 
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.linkservice.googleuser(userData).subscribe(result=>{
          localStorage.setItem('token',JSON.stringify(result));
          this.router.navigateByUrl('/user');
          console.log(result)
        })
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
      }
    );
  }
  // onFormSubmit(data) {
  //   console.log(data);
  //   localStorage.setItem('email', data.email);
  //   this.router.navigateByUrl('/user');
  // }
  onFormSubmit(data) {
    //this.router.navigateByUrl('/');
    this.linkservice.checkuser(data).subscribe(result=>{
      if(result){
        alert("success")
        // sessionStorage.setItem('token', JSON.stringify(result));
        localStorage.setItem('token', JSON.stringify(result));
        console.log(result)
        this.router.navigateByUrl('/user');
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
