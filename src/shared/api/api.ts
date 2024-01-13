import axios from 'axios';


export const $api = axios.create({
  baseURL: 'https://bac-todo.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
