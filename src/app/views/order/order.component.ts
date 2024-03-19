import {Component} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-яЁё]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-яЁё]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^(\\+)?((\\d{2,3}) ?\\d|\\d)(([ -]?\\d)|( ?(\\d{2,3}) ?)){9,12}\\d$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: ['', [Validators.required]],
    address: ['', [Validators.required]],
    comment: ['', [Validators.required]]
  })


  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
  }


  ngOnInit(): void {
    const productParam = this.activatedRoute.snapshot.queryParamMap.get('product');
    if (productParam) {
      this.checkoutForm.get('product')?.patchValue(productParam);
    }

  }


  signIn() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
    } else console.log('invalid');
  }

  isError(controlName: string): boolean {
    return this.checkoutForm.get(controlName)?.invalid
      && (this.checkoutForm.get(controlName)?.touched || this.checkoutForm.get(controlName)?.dirty)
      && this.checkoutForm.get(controlName)?.errors?.['required']
  }


  public createOrder() {

    if (this.checkoutForm.invalid) {
      const keys: string[] = Object.keys(this.checkoutForm.controls);
      keys.forEach((key: string): void => {
        this.checkoutForm.get(key)?.markAsTouched();
        this.checkoutForm.get(key)?.markAsDirty();
        this.checkoutForm.get(key)?.updateValueAndValidity();
      })
      return;
    }


    this.productService.createOrder({
      name: this.checkoutForm.get('name')?.value,
      last_name: this.checkoutForm.get('last_name')?.value,
      phone: this.checkoutForm.get('phone')?.value,
      country: this.checkoutForm.get('country')?.value,
      zip: this.checkoutForm.get('zip')?.value,
      product: this.checkoutForm.get('product')?.value,
      address: this.checkoutForm.get('address')?.value,
      comment: this.checkoutForm.get('comment')?.value
    })
      .subscribe(response => {
        if (response.success && !response.message) {
          alert('Спасибо за заказ');

        } else {
          alert('Ошибка!');
        }
      })


  }


}
