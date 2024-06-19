public class Parking{
    
    private int MaxCapacity = 100;
    final private Car[] cars = new Car[MaxCapacity];
    private int[] maxCarDimensions = {550, 250};
    private int Capacity = 0;

    public Parking() {
    }

    public Parking(int MaxCapacity, int[] maxCarDimensions) {
        this.MaxCapacity = MaxCapacity;
        this.maxCarDimensions = maxCarDimensions;
    }

    public Parking(Car[] _cars){
        this.Park(_cars);
    }

    public Parking(int MaxCapacity, int[] maxCarDimensions, Car[] _cars){
        this.MaxCapacity = MaxCapacity;
        this.maxCarDimensions = maxCarDimensions;
        this.Park(_cars);
    }

    public void Park(Car car){
        if (Capacity < MaxCapacity){
            cars[Capacity] = car;
            Capacity++;
        }
        else{
            System.out.println("Sorry, parking is full.");
        }
    }

    public void Park(Car[] Cars){

        int initCapacity = Capacity;
        
        for (Car car : Cars) {
            if (Capacity < MaxCapacity){
                if (car.Compare(maxCarDimensions[0], maxCarDimensions[1])){
                    this.cars[Capacity] = car;
                    Capacity++;
                }
                else{
                    System.out.println("******************");
                    car.info();
                    System.out.printf("is too big.\nThe required Dimensions are: %d x %d max\n", maxCarDimensions[0], maxCarDimensions[1]);
                    System.out.println("******************");
                }
            }
            else break;
        }
    
        System.out.println("There are " + Capacity + " cars in the parking lot.");
        System.out.println("Out of the "+Cars.length+" cars, "+(Capacity-initCapacity)+" were able to park.");

    }

}