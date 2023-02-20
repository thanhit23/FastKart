import 'regenerator-runtime';
import { CategoryModel } from '../../models';
import { CategoryService } from '../../services';
import { URL as baseUrl } from '../../constants/firebase';
import { readParams } from '../../helpers/Url';

const EditCategory = function() {
  this.url = location.href;
  this.id = readParams(this.url, 'id');
  this.categoryId = $('#categoryId');
  this.name = $('#name');
  this.image = '';
  this.categoryService = new CategoryService(baseUrl, 'Token');
}

EditCategory.prototype = {
  init: function() {
    this.setCategory();
    this.addEventListner();
  },

  setCategory: function() {
    this.categoryService.getCategoryById(this.id).then(({ name, image }) => {
      this.name.val(name);
      this.categoryId.val(this.id);
      this.image = image;
    })
  },

  updateCategories: function() {
    const category = new CategoryModel(null, this.name.val(), this.image);
    try {
      this.categoryService
        .updateCategory(this.id, category)
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
