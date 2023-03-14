package Lab1_oops.src;
import java.util.Random;

public class Employee {
    private String firstName;
    private String lastName;
    private String department;
    private String company;
    private String email;
    private String password;
    
    public Employee(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
    private String generateRandomPassword() {
        String capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String smallLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialChars = "!@#$%^&*_=+-/.?<>)";

        String combinedChars = capitalLetters + smallLetters + numbers + specialChars;

        Random random = new Random();
        char[] password = new char[8];

        password[0] = capitalLetters.charAt(random.nextInt(capitalLetters.length()));
        password[1] = smallLetters.charAt(random.nextInt(smallLetters.length()));
        password[2] = numbers.charAt(random.nextInt(numbers.length()));
        password[3] = specialChars.charAt(random.nextInt(specialChars.length()));

        for(int i = 4; i< 8 ; i++) {
            password[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
        }

        return new String(password);
    }
    
    private String generateEmailAddress() {
        return firstName.toLowerCase() + lastName.toLowerCase() + "@" + department.toLowerCase() + "."+company +".com";
    }
    
    public void showCredentials() {
        System.out.println("Dear " + firstName + ", your generated credentials are as follows:");
        System.out.println("Email ---> " + email);
        System.out.println("Password ---> " + password);
    }
    
    public void generateCredentials() {
        setPassword(generateRandomPassword());
        setEmail(generateEmailAddress());
    }
    
}

   

