import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {observable, Observable, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import { Modal } from 'bootstrap';


// declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal', {static: true})

  private modalRef!: ElementRef<HTMLDivElement>;

  // private modal!: Modal;

  private observable: Observable<string>;

  private subscription: Subscription | null = null;



 constructor(public cartService: CartService,
             private modalService: NgbModal
             ) {
   this.observable = new Observable((observer) => {
     setTimeout(() => {
       observer.next('block');
     }, 10000);
   });
 }

 @ViewChild('popup')
 popup!: TemplateRef<ElementRef>;

 ngOnInit() {

   // this.subscription = this.observable.subscribe((param: any) => {
   //   this.modal = new Modal(this.modalRef.nativeElement);
   //   this.modal.show();
   //  });



   // $('.accordion').accordion({
   //   heightStyle: 'content',
   //   header: '> .accordion-item > .accordion-header'
   // });


 }

 ngAfterViewInit() {
   // this.modalService.open(this.popup, {});
    this.subscription = this.observable.subscribe((param: any) => {
      this.modalService.open(this.popup, {});
     });
 }

  ngOnDestroy() {
   this.subscription?.unsubscribe();
   // this.modal?.hide();
 }



}
