

public class Main{
    public static void main(String[] args) {
        
        Car car1 = new Car();
        Car car = new Car("Ford", "F150", 2015, 100000);
        car.drive(10000);
        car.info();
        car1.info();
        car1.drive(10E30);
        car1.info();

    }
}