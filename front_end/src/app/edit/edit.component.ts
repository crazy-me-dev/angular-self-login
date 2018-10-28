import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../link.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [LinkService]
})
export class EditComponent implements OnInit {
 
  angForm: FormGroup;

  title = 'Edit Data';
  data : any;

  constructor(
    private linkservice: LinkService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { 

  }
  onFormSubmit(updatedata) {
    console.log(updatedata)
    this.route.params.subscribe(params => {
      console.log(params.id)
      this.linkservice.updatedata(params.id,updatedata).subscribe(res => {
        console.log(res)
        //this.data = res ;
        // var datas = this.data[0];
        // console.log(datas)
        //console.log(this.data[0].distance)
        //console.log('Deleted');
      });

    })
    // var updatedata = {
    //   distance : distance,
    //   startDate : startDate,
    //   endDate : endDate,
    //   commite : commite
    // }

}

  ngOnInit() {
    this.angForm = this.fb.group({
        distance: ['', Validators.required ],
        startDate: ['', Validators.required ],
        endDate: ['', Validators.required ],
        commite: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      console.log("+++++++++++")
      console.log(params)
      this.linkservice.editdata(params['id']).subscribe(res => {
        
        this.data = res ;
        console.log(this.data)
      
      });
    });
  }

}
