import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/employees";

// Fetch tất cả nhân viên
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

// Thêm nhân viên mới
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const res = await axios.post(API_URL, employee);
    return res.data;
  }
);

// Cập nhật nhân viên
export const updateEmployeeById = createAsyncThunk(
  "employees/updateEmployeeById",
  async ({ id, data }) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

// Xóa nhân viên
export const deleteEmployeeById = createAsyncThunk(
  "employees/deleteEmployeeById",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.status = "loading"; })
      .addCase(fetchEmployees.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; })
      .addCase(fetchEmployees.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })
      .addCase(addEmployee.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateEmployeeById.fulfilled, (state, action) => {
        const index = state.items.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteEmployeeById.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload);
      });
  },
});

export default employeesSlice.reducer;
