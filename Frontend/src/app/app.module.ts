import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

// import { AvatarModule } from 'ngx-avatar';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider("Your-Facebook-app-id")
        // },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("42954571675-no85iikkqfe67pogqmikaqsipgrsb8q2.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    CreateComponent,
    EditComponent,
    IndexComponent
    // AvatarModule
    
  ],
  
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // DlDateTimePickerDateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { animation: 'login' } },
      { path: 'signup', component: SignupComponent, data: { animation: 'signup' } },
      // { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, data: { animation: 'user'} },
      
      { path: 'create', component: CreateComponent},
      { path: 'edit/:id',component: EditComponent },
      { path: 'index', component: IndexComponent }
    ], {
        useHash: true
      })
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
