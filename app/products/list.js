import 'regenerator-runtime';
import { map } from 'lodash';

import { ProductService, CategoryService } from '../services';
import { URL } from '../constants/firebase';

const Product = function() {
  this.tbody = $('#table-tb');
  this.categories = {};
  this.productService = new ProductService(URL, 'Token');
  this.categoryService = new CategoryService(URL, 'Token');
};

Product.prototype = {
  initial: function() {
    this.getCategories();
    this.addEventListner();
    this.renderProduct();
  },

  addEventListner: function() {
    $(document).on('click', '.btn-delete', e => this.handleAddProductClick(e));
    $('#btn-confirm').on('click', e => this.handleDeleteProduct(e));
  },

  getCategories: function() {
    this.categoryService.getCategories().then(category => {
      map(category, ({ name }, key) => {
        this.categories[key] = name;
      });
    })
  },

  renderProduct: function() {
    return (
      this.productService.getProducts().then(product => {
        map(product, ({ category: id, name, description, price, image }, key) => {
          const category = map(this.categories, (value, key) => {
            if (key === id) return value;
            return null;
          });
  
          this.tbody.append(`
          <tr>
            <td>${key}</td>
            <td>${name}</td>
            <td>${category.filter(value => value != null)}</td>
            <td>
              <span class="td-table">${description}</span>
            </td>
            <td>${price}</td>
            <td>
              <img class="tb-image" src="${process.env.APIURL}files%2F${image}" alt="">
            </td>
            <td>
              <div class="d-flex">
                <a href="editProduct.html?id=${key}" class="btn btn-warning mx-2">Edit</a>
                <button type="button" class="btn btn-danger btn-delete" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${key}">
                  Delete
                </button>
              </div>
            </td>
          </tr>`);
        });
      })
    )
  },

  handleAddProductClick: function({ target: { dataset: { id } } }) {
    const btnConfirm = $('#btn-confirm');
    btnConfirm[0].dataset.id = id;
  },

  handleDeleteProduct: function({ target: { dataset: { id } } }) {
    try {
      this.productService.deleteProduct(id).then(() => {
        this.tbody.empty();
        this.renderProduct();
      })
    } catch (error) {
      console.log(error);
    }
  },
}
  
const product = new Product();
product.initial();
