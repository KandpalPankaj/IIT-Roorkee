package com.greatlearning.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.greatlearning.ems.model.Employee;
import com.greatlearning.ems.service.EmployeeService;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@GetMapping("/list")
	public String employeeList(Model model) {
		List<Employee> employees = this.employeeService.viewAllEmployees();
		model.addAttribute("employees", employees);
		return "employee/list-employees";
	}

	@PostMapping("/save")
	public String saveEmployee(@ModelAttribute("employee") Employee employee) {
		this.employeeService.saveEmployee(employee);

		return "redirect:/employees/list";
	}

	@PostMapping("/showFormForUpdate")
	public String showFormForUpdate(@RequestParam("id") int id, Model model) {

		Employee employeeUpdate = employeeService.findEmployeeById(id);

		model.addAttribute("employee", employeeUpdate);

		return "employee/employee-form";
	}

	@PostMapping("/delete")
	public String deleteEmployee(@RequestParam("id") int id) {
		this.employeeService.deleteEmployeeById(id);
		return "redirect:/employees/list";
	}

	@GetMapping("/add")
	public String showFormForAdd(Model model) {
		Employee employeeAdd = new Employee();

		model.addAttribute("employee", employeeAdd);

		return "employee/employee-form";
	}

}
