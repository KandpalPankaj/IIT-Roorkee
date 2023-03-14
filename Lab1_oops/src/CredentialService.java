package Lab1_oops.src;

public class CredentialService {
     public static void main(String[] args) {
        Employee employee = new Employee("Harshit", "Choudhary");
        employee.setDepartment("Tech");
        employee.setCompany("abc");
        employee.generateCredentials();
        employee.showCredentials();
    }
}
