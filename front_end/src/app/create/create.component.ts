import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
// import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [LinkService]
})
export class CreateComponent implements OnInit {

  title = 'Add Data';
  angForm: FormGroup;
  constructor( private linkservice: LinkService, private fb: FormBuilder ) {
    //this.createForm();
  }
  // onFormSubmit(form) {
  //   console.log("form", form.value)
  // }
  add(distance, startDate, endDate, commite) {
    var formdata = {
      distance : distance,
      startDate : startDate,
      endDate : endDate,
      commite : commite
    }

    this.linkservice.adddata(formdata).subscribe(result=>{
      if(result){
        sessionStorage.setItem('token', JSON.stringify(result));
        console.log("++++++++++")
        console.log(result)
        console.log("++++++++++")
        alert('success')
      }

    },error => {
      if(error.status == 302){
        alert(error.error)

      }else{
        alert('Error occured')
      }
    });

    console.log(formdata)

    //this.coinservice.addCoin(name, price);
}

  ngOnInit() {
    this.angForm = this.fb.group({
      distance: ['', Validators.required ],
      startDate: ['', Validators.required ],
      endDate: ['', Validators.required ],
      commite: ['', Validators.required]
   });
  }
}
