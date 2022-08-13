import { createSlice } from '@reduxjs/toolkit';
import { initStateAuthEmployee, reducerAuthEmployee } from '../actions/employee/auth.action';
import { initStateDeleteEmployee, reducerDeleteEmployee } from '../actions/employee/deleteEmployee.action';
import { initStateGetEmployee, reducerGetEmployee } from '../actions/employee/getEmployee.action';
import { initStateGetEmployees, reducerGetEmployees } from '../actions/employee/getEmployees.action';
import { initStateGetEmployeeUser, reducerGetEmployeeUser } from '../actions/employee/getEmployeeUser.action';
import { initStateLoginEmployee, reducerLoginEmployee } from '../actions/employee/login.action';
import { initStateSync1C, reducerSync1C } from '../actions/employee/sync1C.action';
import { initStateUpdateEmployee, reducerUpdateEmployee } from '../actions/employee/updateEmployee.action';
import { initStateUploadAvatar, reducerUploadAvatar } from '../actions/employee/uploadAvatar.action';

export const initialState = {
  ...initStateAuthEmployee,
  ...initStateLoginEmployee,
  ...initStateGetEmployees,
  ...initStateGetEmployee,
  ...initStateUpdateEmployee,
  ...initStateGetEmployeeUser,
  ...initStateDeleteEmployee,
  ...initStateUploadAvatar,
  ...initStateSync1C,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    resetGetEmployees(state) {
      state.getEmployees = initStateGetEmployees.getEmployees;
    },
    resetLoginEmployee(state) {
      state.loginEmployee = initStateLoginEmployee.loginEmployee;
    },
  },
  extraReducers: {
    ...reducerAuthEmployee,
    ...reducerLoginEmployee,
    ...reducerGetEmployees,
    ...reducerGetEmployee,
    ...reducerUpdateEmployee,
    ...reducerGetEmployeeUser,
    ...reducerDeleteEmployee,
    ...reducerUploadAvatar,
    ...reducerSync1C,
  },
});
export const { resetGetEmployees, resetLoginEmployee } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
