package com.greatlearning.ems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmpMvcApp1Application {

	public static void main(String[] args) {
		SpringApplication.run(EmpMvcApp1Application.class, args);
		System.out.println("Hey, Your application gets executed successfully.");
	}

}