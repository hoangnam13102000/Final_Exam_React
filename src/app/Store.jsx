import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeesSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
