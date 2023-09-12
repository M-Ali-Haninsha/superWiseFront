import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit{

  userDetailsForm:any
  ratingForm: any
  formData:any
  formData2:any
  selectedRating: number | null = null;
  typedMessage: string = '';
  messageForm:any
  progressImages:any
  mClientData:any
  mWorkerData:any
  sendedMessageByClient:any
  sendData:any
  historyWorkStatus:any

  constructor(private formBuilder: FormBuilder,private ref: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any, private service: UserService, private chatService: ChatService, private route:Router) {
    this.messageForm = this.formBuilder.group({
      typedMessage: [''], 
    });
  }

  ngOnInit(): void {
     if (this.editData.mode === 'userDetails') {
        this.userDetailsForm = this.formBuilder.group({
          firstName: [this.editData.data.firstName],
          lastName: [this.editData.data.lastName],
          phoneNo: [this.editData.data.phone],
          location: [this.editData.data.location]
        });
      }

      if(this.editData.mode == 'rating') {        
        this.ratingForm = this.formBuilder.group({
          comment: ['', Validators.required]
        })
      }    
      this.chatService.test().subscribe((value)=>{
        this.sendedMessageByClient = value
      })

      this.chatService.clientMessage().subscribe((value)=> {
        this.sendedMessageByClient = value
      })
      if(this.editData.mode == 'userViewHistory') {
        this.viewHistory()
      }
      this.getClient()
      this.getWorker()
      this.getProgressImages()
  }

  updateUserData() {
    this.formData = this.userDetailsForm.value
    this.service.editUserDetails(this.formData).subscribe((value)=> {
      this.ref.close('detailsUpdated')
    })
  }


  rate(rating: number) {
    this.selectedRating = rating;
  }

  getStarClass(starNumber: number): string {
    if (this.selectedRating !== null && starNumber <= this.selectedRating) {
      return 'w-12 h-12 text-yellow-500 cursor-pointer';
    } else {
      return 'w-12 h-12 text-gray-500 cursor-pointer';
    }
  }

  subnitRating() {
    console.log('submit',this.selectedRating);
    this.formData2 = this.ratingForm.value
    this.service.rating(this.formData2, this.editData.data, this.selectedRating).subscribe((value)=> {
      this.ref.close('ratingSubmitted')
    })
  }

  sendMessageToWorker(){
    const message = this.messageForm.value.typedMessage;
    console.log(this.editData.data._id);
    const chatMessage = {
      sender: this.mClientData.firstName, 
      senderId: this.mClientData._id,
      timestamp: new Date(),
      content: message,
      recieverId: this.sendData.recieverId
    };
    this.chatService.sendMessage(chatMessage).subscribe()
    this.messageForm.reset();
  }

  getClient() {
    this.service.clientDetails().subscribe((value)=>{
      this.mClientData = value.clientDataMessage
    })
  }

  getWorker() {
    this.service.workerDetails(this.editData.data._id).subscribe((value)=> {
      this.mWorkerData = value.workerDataMessage
      
    })
  }

  selectWorker(data:any) {
    this.sendData = {
      senderId:this.mClientData._id,
      recieverId: data._id
    }
    console.log(this.sendData);
    this.chatService.selectWorker(this.sendData).subscribe()
  }

  getProgressImages() {
    this.service.getprogressPhotos(this.editData.data).subscribe((value)=> {
      this.progressImages = value.progressImages
    })
  }

  viewHistory() {
    this.service.userViewHistory().subscribe((value)=> {
      console.log('mm',value.user); 
      this.historyWorkStatus = value.user.workStatus
      console.log(this.historyWorkStatus);
    })
  }

  viewMoreHistory(workerId:string) {
    this.route.navigate(['singleViewHistory',workerId])
  }
}

