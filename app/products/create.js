import 'regenerator-runtime';
import { map } from 'lodash';

import ProductModel from '../models/Product';
import { CategoryService, ProductService } from '../services';
import { URL } from '../constants/firebase';

const CreateProduct = function() {
  this.categoryService = new CategoryService(URL, 'Token');
  this.productService = new ProductService(URL, 'Token');
  this.messages = 'Trường này không được bỏ trống';
}

CreateProduct.prototype = {
  init: function() {
    this.getCategories();
    this.addEventListner();
  },

  uploadFile: function(e) {
    const file = e.target.files[0];
    this.productService.uploadFile(file);
  },
  

  getCategories: function() {
    try {
      this.categoryService.getCategories().then(category => {
        const categoryElement = $('#category');
        map(category, ({ name }, key) => {
          categoryElement.append(`<option value="${key}">${name}</option>`)
        });
      })
    } catch (error) {
      console.log(error);
    }
  },

  setMessageDefault: function({ target: { nextElementSibling } }) {
    nextElementSibling.textContent = '';
  },

  setMessageError: function(name) {
    const message = $(`#${name}`);
    message[0].nextElementSibling.textContent = this.messages;
    return true;
  },

  handelAddProduct: function() {
    const name = $('#name').val();
    const category = $('#category')[0].value;
    const price = $('#price').val();
    const description = $('#description').val();
    const images = $('#image');

    if (!name || !category || !price || !description) {
      !name && this.setMessageError('name');
      category === '0' && this.setMessageError('category');
      !price && this.setMessageError('price');
      !description && this.setMessageError('description');
      return;
    }

    if (images[0].files[0]) {
      this.productService.uploadFile(images[0].files[0])
    }

    const image = images[0].files[0].name;

    const product = new ProductModel(null, name, category, price, description, `${image}?alt=media`);

    try {
      this.productService.createProduct(product).then(() => {
        location.href = '/listProduct.html';
      })
    } catch (error) {
      console.log(error);
    }
  },

  addEventListner: function() {
    $('#name').change(e => this.setMessageDefault(e));
    $('#category').change(e => this.setMessageDefault(e));
    $('#price').change(e => this.setMessageDefault(e));
    $('#description').change(e => this.setMessageDefault(e));
    $('#save').on('click', () => this.handelAddProduct());
  },
}

const createProduct = new CreateProduct();
createProduct.init();
