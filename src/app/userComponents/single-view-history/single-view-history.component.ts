import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-view-history',
  templateUrl: './single-view-history.component.html',
  styleUrls: ['./single-view-history.component.css']
})
export class SingleViewHistoryComponent implements OnInit{
  @ViewChild('printMe', { static: false }) printMe!: ElementRef;

  id:string

  constructor(private activateRoute: ActivatedRoute, private renderer: Renderer2) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || '' 
  }

  ngOnInit(): void {
      console.log(this.id);
      
  }

  downloadPdf(){
    const printContents = this.printMe.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    this.renderer.setProperty(document.body, 'innerHTML', printContents);
    window.print();
    this.renderer.setProperty(document.body, 'innerHTML', originalContents);
  }
}
