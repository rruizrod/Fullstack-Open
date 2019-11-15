import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const add = newPerson => {
  const request = axios.post(baseURL, newPerson);
  return request.then(response => response.data);
};

const del = id => {
  const request = axios.delete(`${baseURL}/${id}`, id);
  return request.then(response => response.data);
};

const update = (id, obj) => {
  const request = axios.put(`${baseURL}/${id}`, obj);
  return request.then(response => response.data);
};

export default { getAll, add, del, update };
