import 'regenerator-runtime';
import { CategoryModel } from '../../models';
import { CategoryService } from '../../services';
import { URL } from '../../constants/firebase';

const CreateCategory = function() {
  this.name = $('#name');
  this.nameVal = $('#name').val();
  this.message = $('#message');
  this.categoryService = new CategoryService(URL, 'Token');
}

CreateCategory.prototype = {
  init: function() {
    this.addEventListner();
  },

  addEventListner: function() {
    $('#name').on('change', () => this.message.text(''));
    $('#save').on('click', () => this.handelAddCategory());
  },

  handelAddCategory: function() {
    this.nameVal = $('#name').val();
    const images = $('#image');
  
    if (!this.nameVal) {
      this.message.text('Vui lòng nhập ít nhất một ký tự');
      return;
    };

    if (images[0].files[0]) {
      this.categoryService.uploadFile(images[0].files[0])
    }

    const image = images[0].files[0].name;

    const category = new CategoryModel(null, this.nameVal, `${image}?alt=media`)
    try {
      this.categoryService.createCategory(category).then(() => {
        location.href = '/listCategory.html'
      })
    } catch (error) {
      console.log(error);
    }
  },
}

const createCategory = new CreateCategory();
createCategory.init();
