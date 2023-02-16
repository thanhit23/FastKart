import 'regenerator-runtime';
import { map } from 'lodash';

import { CategoryService, ProductService } from '../../services';
import { URL } from '../../constants/firebase';

const Home = function () {
  this.category = $('.category-list');
  this.product = $('#product-list');
  this.categoryService = new CategoryService(URL, 'Token');
  this.productService = new ProductService(URL, 'Token');
};

Home.prototype = {
  initial: function () {
    this.renderCategories();
    this.renderProducts();
  },

  renderCategories: function () {
    return (
      this.categoryService.getCategories().then(category => {
        map(category, ({ name, image }) => {
          this.category.append(`
            <li class="onhover-category-list">
              <a href="javascript:void(0)" class="category-name">
                <img src="${process.env.APIURL}files%2F${image}" alt="">
                <h6>${name}</h6>
              </a>
            </li>
            `
          );
        });
      })
    )
  },

  renderProducts: function () {
    return (
      this.productService.getProducts().then(product => {
        console.log(product);
          map(product, ({ name, image, price }) => {
            this.product.append(`
              <div style="width: 242px;">
                <div class="row m-0">
                  <div class="col-12 px-0">
                    <div class="product-box wow fadeIn" data-wow-delay="0.1s">
                      <div class="product-image">
                        <a href="#">
                          <img src="${process.env.APIURL}files%2F${image}" class="img-fluid blur-up lazyload" alt="">
                        </a>
                      </div>
                        <div class="product-detail">
                            <a href="#">
                                <h6 class="name name-2 h-100">${name}</h6>
                            </a>
                            <div class="counter-box mt-3">
                                <h6 class="sold theme-color">VND ${price}</h6>

                                <div class="addtocart_btn">
                                    <button class="add-button addcart-button btn buy-button text-light">
                                        <span>Add</span>
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </div>
            `);
          })
      })
    )
  },
}

const home = new Home();
home.initial();

