package com.greatlearning.ems.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greatlearning.ems.model.Employee;
import com.greatlearning.ems.repository.EmployeeJpaRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private final EmployeeJpaRepository employeeRepository;

	public EmployeeServiceImpl(EmployeeJpaRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	@Override
	public Employee saveEmployee(Employee employee) {

		return this.employeeRepository.save(employee);
	}

	@Override
	public List<Employee> viewAllEmployees() {
		List<Employee> employees = this.employeeRepository.findAll();
		return employees;
	}

	@Override
	public Employee findEmployeeById(long id) {

		return this.employeeRepository.findById(id).orElseThrow();
	}

	@Override
	public Employee updateEmployee(long id, Employee employee) {

		Optional<Employee> optionalEmployee = this.employeeRepository.findById(id);
		if (optionalEmployee.isPresent()) {
			Employee employeee2 = optionalEmployee.get();
			employeee2.setFirstName(employee.getFirstName());
			employeee2.setLastName(employee.getLastName());
			employeee2.setEmail(employee.getEmail());
		}

		return employee;
	}

	public EmployeeJpaRepository getEmployeeRepository() {
		return employeeRepository;
	}

	@Override
	public void deleteEmployeeById(long id) {
		this.employeeRepository.deleteById(id);

	}

}