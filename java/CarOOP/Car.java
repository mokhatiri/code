public class Car{

    final private String make;
    final private String model;
    final private int year;
    private double price;

    Car(){
        this.make = "Test";
        this.model = "Unknown";
        this.year = 1999;
        this.price = 10E20; // in USD
    }

    Car(String make, String model, int year, double price){
        this.make = make;
        this.model = model;
        this.year = year;
        this.price = price; // in USD
    }

    void drive(double distance){
        // distance in km

        if (distance < (price-300)*100){
            System.out.println("Driving " + distance + " miles");
            this.price -= distance/100;
        }
        else{
            System.out.println("Driving....");
            System.out.println("Your car broke midway, you were only able to drive " + (price-300)*100 + "kms");
            this.price = 300;
        }
    }

    void info(){
        System.out.println("This car is a " + make + " " + model + " " + year + " and costs $" + price);
    }
}