import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: ProductType;

  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
    this.product = {
      id: 0,
      price: '',
      image: '',
      title: '',
      description: ''
    }
  }

}
