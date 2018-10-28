import { Router } from '@angular/router';
import { LinkService } from '../link.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [LinkService]
})
export class UserComponent implements OnInit {
  title = 'Jogging App';
  _resp: String;
  imageSrc: String;
  datas : any;
  constructor(private linkservice: LinkService, private router: Router) { }

  ngOnInit() {
    this._resp='';
    this.getAvatarimage();
    this.getData();
  }
  gotoCreate() {
    this.router.navigateByUrl('/create');
  }
  getToken() {
    return localStorage.getItem('token');

  }

  getData(){
    this.linkservice.getData().subscribe(result=>{
      this.datas = result ;
      
      //localStorage.setItem('token',JSON.stringify(result));
    })

  }

  getAvatarimage(){
    if (this.url) {
      return this.url;
    }
    var image = JSON.parse(localStorage.getItem('token'))[0];
    console.log("+++",image.avatarurl)
    return image.avatarurl;
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
  }

  url = '';
  selectedFile: File;
  
  onFileChanged(event) { 
    this.selectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target['result'];
      }
    }
  }

  onUpload() {
    const uploadData = new FormData();
    // var email = "aaa33@gmail.com";
    console.log(localStorage.getItem('token'))
    var info = JSON.parse(localStorage.getItem('token'));
    console.log("aaaaaaa----------",info)
    var email = info[0].email;
    console.log(email);
    uploadData.append('file', this.selectedFile);
    // uploadData.append('filename', this.selectedFile.name);
    uploadData.append('email',email);
    console.log(uploadData);
    // console.log(this.selectedFile);
    // console.log(this.selectedFile.name);
    this.linkservice.imageupload(uploadData).subscribe(result=>{
      
      localStorage.setItem('token',JSON.stringify(result));
    })
    // this.http.post('my-backend.com/file-upload', uploadData, {
    //   reportProgress: true,
    //   observe: 'events' 
    // })
    //   .subscribe(event => {
    //     console.log(event); // handle event here
    //   });
  
  }

  deletedata(id) {
      this.linkservice.deletedata(id).subscribe(res => {
        this.datas = res ;
        console.log('Deleted');
      });
    }

}
