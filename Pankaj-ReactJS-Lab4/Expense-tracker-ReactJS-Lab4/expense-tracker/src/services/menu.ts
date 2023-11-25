// Importing the Axios library for making HTTP requests
import axios from "axios";
// Importing the IDataList interface for defining the data structure
import IDataList from "../model/IDataList";

// Function to fetch data from the server
const getDataFromServer = () => {
  // Making a GET request to the server's 'items' endpoint
  return axios
    .get<IDataList[]>("http://localhost:3000/items")
    .then((res) => res.data);
};

// Function to push new expense data to the server
const pushDataToServer = (newExpense: Omit<IDataList, "id">) => {
  // Making a POST request to the server's 'items' endpoint with the new expense data
  return axios
    .post<IDataList>("http://localhost:3000/items", newExpense, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Exporting the functions for use in other parts of the application
export { getDataFromServer, pushDataToServer };
