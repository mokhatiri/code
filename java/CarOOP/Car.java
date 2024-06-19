public class Car{

    final private String make;
    final private String model;
    final private double length;
    final private double width;
    final private int year;
    private double price;

    Car(){
        this.make = "Test";
        this.model = "Unknown";
        this.length = 401; // in cm
        this.width = 194; // in cm
        this.year = 1999;
        this.price = 10E20; // in USD
    }

    Car(String make, String model,double length,double width, int year, double price){
        this.make = make;
        this.model = model;
        this.length = length; // in cm
        this.width = width; // in cm
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
        System.out.println("Car: " + make + " " + model + " " + year+".");
    }

    void MoreInfo(){

        System.out.println("*************");
        this.info();
        System.out.println("Price: " + price);
        System.out.println("Dimensions: " + length + " " + width);
        System.out.println("*************");
    }

    boolean Compare(double _length, double _width){

        if (this.length > _length){
            return false;
        }
        else if (this.width > _width){
            return false;
        }
        else{
            return true;
        }

    }

}