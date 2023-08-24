import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit{

  id!:string
  progressValue = 0;
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});


  constructor(private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''  
  }
  
  ngOnInit(): void {
      
  }

  updateProgress(stage: number): void {
    if(stage===0) {
      this.progressValue = 0; 
    }else if (stage === 1) {
      this.progressValue = 33; 
    } else if (stage === 2) {
      this.progressValue = 66; 
    } else if (stage === 3) {
      this.progressValue = 100; 
    }
  }
}
