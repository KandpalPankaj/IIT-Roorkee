package com.greatlearning.ems.service;

import java.util.List;

import com.greatlearning.ems.model.Employee;

public interface EmployeeService {
	Employee saveEmployee(Employee employee);

	List<Employee> viewAllEmployees();

	Employee findEmployeeById(long id);

	Employee updateEmployee(long id, Employee employee);

	void deleteEmployeeById(long id);

}