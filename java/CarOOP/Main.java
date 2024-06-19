

public class Main{
    public static void main(String[] args) {
        
        Car car1 = new Car();
        Car car = new Car("Ford", "Focus", 401, 194, 2019, 10000);
        car.drive(10000);
        car.info();
        car1.MoreInfo();
        car1.drive(10E30);
        car1.MoreInfo();

        Parking parking = new Parking();
        parking.Park(car);
        parking.Park(new Car[]{car,car1});
    }
}