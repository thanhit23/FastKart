import 'regenerator-runtime';
import { map } from 'lodash';

import CategoryService from '../services/CategoryService';
import { URL } from '../constants/firebase';

const ListCategory = function() {
  this.tbody = $('#table-tb');
  this.categoryService = new CategoryService(URL, 'Token');
};

ListCategory.prototype = {
  initial: function() {
    this.addEventListner();
    this.renderCategories();
  },

  addEventListner: function() {
    $(document).on('click', '.btn-delete', e => this.handleDeleteCategory(e));
    $('#btn-confirm').on('click', e => this.confirmDeleteCategory(e));
  },

  renderCategories: function() {
    return (
      this.categoryService.getCategories().then(category => {
        map(category, ({ name, image }, key) => {
          this.tbody.append(`
          <tr>
            <td>${key}</td>
            <td>${name}</td>
            <td>
              <img width=50 height=50 src="${process.env.APIURL}files%2F${image}" alt="">
            </td>
            <td>
              <a href="editCategory.html?id=${key}" class="btn btn-warning">Edit</a>
              <button type="button" class="btn btn-danger btn-delete" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${key}">
                Delete
              </button>
            </td>
          </tr>`);
        });
      })
    )
  },

  handleDeleteCategory: function({ target: { dataset: { id } } }) {
    const btnConfirm = $('#btn-confirm');
    btnConfirm[0].dataset.id = id;
  },

  confirmDeleteCategory: function({ target: { dataset: { id } } }) {
    try {
      this.categoryService.deleteCategory(id).then(() => {
        this.tbody.empty();
        this.renderCategories();
      })
    } catch (error) {
      console.log(error);
    }
  },
}
  
const listCategory = new ListCategory();
listCategory.initial();

