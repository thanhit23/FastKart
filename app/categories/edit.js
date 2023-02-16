import 'regenerator-runtime';
import CategoryModel from '../models/Category';
import CategoryService from '../services/CategoryService';
import { URL as baseUrl } from '../constants/firebase';
import { readParams } from '../helpers/Url';

const EditCategory = function() {
  this.url = location.href;
  this.id = readParams(this.url, 'id');
  this.categoryId = $('#categoryId');
  this.categoryName = $('#name');
  this.categoryService = new CategoryService(baseUrl, 'Token');
  this.category = new CategoryModel(null, this.categoryName.val());
}

EditCategory.prototype = {
  init: function() {
    this.setCategory();
    this.addEventListner();
  },

  setCategory: function() {
    this.categoryService.getCategoryById(this.id).then(({ name }) => {
      this.categoryName.val(name);
      this.categoryId.val(this.id);
    })
  },

  updateCategories: function() {
    try {
      this.categoryService
        .updateCategory(id, this.category)
        .then(() => location.href = '/listCategory.html')
    } catch (error) {
      console.log(error);
    }
  },

  addEventListner: function() {
    $('#save').on('click', () => this.updateCategories());
  },
}

const editCategory = new EditCategory();
editCategory.init();
