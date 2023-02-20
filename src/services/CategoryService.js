import axios from "axios";
import { ref, uploadBytesResumable } from "firebase/storage";
import storage from '../../firebaseConfig';

class CategoryService {
  constructor(realtimeBd, accessToken) {
    this.colectionName = "categories.json";
    this.realtimeBd = realtimeBd;
    this.accessToken = accessToken;
  }

  createCategory = async (data) => {
    const response = await axios.post(this.realtimeBd + this.colectionName, data);

    return response.data.name;
  }

  getCategoryById = async (id) => {
    const response = await axios.get(`${this.realtimeBd}/categories/${id}.json`);

    return response.data;
  }

  getCategories = async () => {
    const response = await axios.get(this.realtimeBd + this.colectionName);
    
    return response.data;
  }

  updateCategory = async (id, data) => {
    const response = await axios.put(`${this.realtimeBd}/categories/${id}.json`, data);

    return response.data;
  }

  deleteCategory = async (id) => {
    const response = await axios.delete(`${this.realtimeBd}/categories/${id}.json`);

    return response.data;
  }

  uploadFile = file => {
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytesResumable(storageRef, file);
  }
}

export default CategoryService;
