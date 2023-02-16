import axios from "axios";
import { ref, uploadBytesResumable } from "firebase/storage";
import storage from '../../firebaseConfig'

class ProductService {
  constructor(realtimeBd, accessToken) {
    this.colectionName = "products.json";
    this.realtimeBd = realtimeBd;
    this.accessToken = accessToken;
  }

  createProduct = async (data) => {
    const response = await axios.post(this.realtimeBd + this.colectionName, data);

    return response.data.name;
  }

  getProductById = async (id) => {
    const response = await axios.get(`${this.realtimeBd}/products/${id}.json`);

    return response.data;
  }

  getProducts = async () => {
    const response = await axios.get(this.realtimeBd + this.colectionName);
    
    return response.data;
  }

  updateProduct = async (id, data) => {
    const response = await axios.put(`${this.realtimeBd}/products/${id}.json`, data);

    return response.data;
  }

  deleteProduct = async (id) => {
    const response = await axios.delete(`${this.realtimeBd}/products/${id}.json`);

    return response.data;
  }

  uploadFile = async file => {
    const storageRef = ref(storage, `files/${file.name}`);
    await uploadBytesResumable(storageRef, file);
  }
}

export default ProductService;
