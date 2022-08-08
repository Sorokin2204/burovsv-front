import { createSlice } from '@reduxjs/toolkit';
import { initStateAuthEmployee, reducerAuthEmployee } from '../actions/employee/auth.action';
import { initStateGetEmployee, reducerGetEmployee } from '../actions/employee/getEmployee.action';
import { initStateGetEmployees, reducerGetEmployees } from '../actions/employee/getEmployees.action';
import { initStateGetEmployeeUser, reducerGetEmployeeUser } from '../actions/employee/getEmployeeUser.action';
import { initStateLoginEmployee, reducerLoginEmployee } from '../actions/employee/login.action';
import { initStateUpdateEmployee, reducerUpdateEmployee } from '../actions/employee/updateEmployee.action';

export const initialState = {
  ...initStateAuthEmployee,
  ...initStateLoginEmployee,
  ...initStateGetEmployees,
  ...initStateGetEmployee,
  ...initStateUpdateEmployee,
  ...initStateGetEmployeeUser,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    resetGetEmployees(state) {
      state.getEmployees = initStateGetEmployees.getEmployees;
    },
  },
  extraReducers: {
    ...reducerAuthEmployee,
    ...reducerLoginEmployee,
    ...reducerGetEmployees,
    ...reducerGetEmployee,
    ...reducerUpdateEmployee,
    ...reducerGetEmployeeUser,
  },
});
export const { resetGetEmployees } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
