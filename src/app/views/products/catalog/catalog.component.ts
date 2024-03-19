import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) {
  }

  public products: ProductType[] = [];
  private subscriptionProducts: any;

  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.subscriptionProducts = this.productService.getProducts().subscribe({

      next: (products: ProductType[]): ProductType[] => this.products = products,
      error: () : Promise<boolean> => this.router.navigate(['/'])
    });




  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }


}
