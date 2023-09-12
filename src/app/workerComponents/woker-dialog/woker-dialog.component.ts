import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ChatService } from 'src/app/services/chat.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-woker-dialog',
  templateUrl: './woker-dialog.component.html',
  styleUrls: ['./woker-dialog.component.css']
})
export class WokerDialogComponent implements OnInit{

  hide = true;
  formData2:any
  formdata3: any
  workerProfileForm!: FormGroup
  workerDetailsForm!: FormGroup
  workerDescriptionForm!: FormGroup
  details:any
  desc:any
  workerMessageForm:any
  mWorkerData:any
  mClientData:any
  sendData:any
  sendedMessageByWorker:any

  constructor( private formBuilder: FormBuilder,private service: WorkerService ,private ref: MatDialogRef<WokerDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any, private chatService:ChatService) {
    this.workerMessageForm = this.formBuilder.group({
      typedMessage: [''], 
    });
  }

  ngOnInit(): void {
      this.workerProfileForm = this.formBuilder.group({
        file: ['']
      })   

      if (this.editData.mode === 'details') {
        this.workerDetailsForm = this.formBuilder.group({
          firstName: [this.editData.workerData.firstName],
          lastName: [this.editData.workerData.lastName],
          department: [this.editData.workerData.department.name],
          phoneNo: [this.editData.workerData.phoneNo],
          location: [this.editData.workerData.district]
        });
      }

      if (this.editData.mode === 'userRequirements') {
        this.details = this.editData
      }

      if (this.editData.mode === 'description') {
        this.workerDescriptionForm = this.formBuilder.group({
          description: [this.editData.workerData.description],
        });
      }

      if(this.editData.mode === 'sendMessageByWorker') {
        this.mClientData = this.editData.data
      }

      this.chatService.test().subscribe((value)=>{
        console.log('aaaaaaaaaaaaaaa',value);
        this.sendedMessageByWorker = value
      })

      this.chatService.clientMessage().subscribe((value)=> {
        console.log('client message',value);
        this.sendedMessageByWorker = value
      })

      this.getWorkerDataM()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];    
    this.workerProfileForm.get('file')?.setValue(file);
  }

  updatePhoto(){
    const fileC = this.workerProfileForm.get('file')
    const formData = new FormData();
    formData.append('file', fileC?.value);
    this.service.editPhoto(formData).subscribe((value)=>{
      this.ref.close('photoUpdated')
    })
  }

  updateDetails() {
    this.formData2 = this.workerDetailsForm.value
    this.service.editDetails(this.formData2).subscribe((value)=>{
      console.log(value); 
      if(value.updated){
        this.ref.close('detailsUpdated')
      }
      if(value.error){
        alert('invalid categories')
      }
      
    })
  }

  editDescription() {
    this.formdata3 = this.workerDescriptionForm.value
    this.service.editDescription(this.formdata3).subscribe((value)=> {
      console.log(value);
      this.ref.close('descriptionUpdated')
    })
  }

  getWorkerDataM() {
    this.service.fetchWorkerData().subscribe((value)=> {
      this.mWorkerData = value.data
    })
  }

  selectClient(data:any) {
    this.sendData = {
      senderId:this.mWorkerData._id,
      recieverId: data._id
    }
    this.chatService.selectWorker(this.sendData).subscribe()
  }

  sendMessageToClient(){
    const message = this.workerMessageForm.value.typedMessage;
    const chatMessage = {
      sender: this.mWorkerData.firstName, 
      senderId: this.mWorkerData._id,
      timestamp: new Date(),
      content: message,
      recieverId: this.mClientData._id
    };
    console.log(chatMessage);
    this.chatService.sendMessage(chatMessage).subscribe()
    this.workerMessageForm.reset();
  }
}
