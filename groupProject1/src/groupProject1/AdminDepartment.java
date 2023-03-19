package groupProject1;

public class AdminDepartment extends SuperDepartment {
    public String departmentName() {
        return "Admin Department";
    }

    public String getTodaysWork() {
        return "Complete your documents submission";
    }

    public String getWorkDeadline() {
        return "Complete by EOD";
    }
}
