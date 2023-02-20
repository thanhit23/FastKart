import 'regenerator-runtime';
import { map } from 'lodash';

import { ProductModel } from '../../models';
import { CategoryService, ProductService} from '../../services';
import { URL } from '../../constants/firebase';
import { readParams } from '../../helpers/Url';

const EditProduct = function() {
  this.url = location.href;
  this.id = readParams(this.url, 'id');
  this.name = $('#name');
  this.price = $('#price');
  this.category = $('#category');
  this.description = $('#description');
  this.image = '';
  this.categoryService = new CategoryService(URL, 'Token');
  this.productService = new ProductService(URL, 'Token');
}

EditProduct.prototype = {
  init: function() {
    this.getCategories();
    this.setProduct();
    this.addEventListner();
  },

  getCategories: function() {
    try {
      this.categoryService.getCategories().then(async category => {
        const categoryElement = $('#category');
        await map(category, ({ name }, key) => {
          categoryElement.append(`<option value="${key}">${name}</option>`)
        });
      })
    } catch (error) {
      console.log(error);
    }
  },

  setProduct: function() {
    this.productService
      .getProductById(this.id)
      .then(({ category, description, name, price, image }) => {
      this.name.val(name);
      this.category[0].value = category;
      this.description.val(description);
      this.price.val(price);
      this.image = image;
    })
  },

  updateProduct: function() {
    try {
      const name = this.name.val();
      const category = this.category[0].value;
      const description = this.description.val();
      const price = this.price.val();

      const product = new ProductModel(null, name, category, price, description, this.image);
      this.productService
        .updateProduct(this.id, product)
        .then(() => location.href = '/listProduct.html')
    } catch (error) {
      console.log(error);
    }
  },

  addEventListner: function() {
    $('#save').on('click', () => this.updateProduct());
  },
}

const editProduct = new EditProduct();
editProduct.init();
