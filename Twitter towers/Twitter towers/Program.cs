// See https://aka.ms/new-console-template for more information
using System;

class Program
{
    static void Main(string[] args)
    {
        int choice;

        do
        {
            Console.WriteLine("Welcome to Twitter Towers Program");
            Console.WriteLine("Choose an option:");
            Console.WriteLine("1. Rectangular Tower");
            Console.WriteLine("2. Triangular Tower");
            Console.WriteLine("3. Exit");

            //Selecting the choice and handling it by sending it to appropriate functions
            choice = int.Parse(Console.ReadLine());
            switch (choice)
            {
                case 1:
                    CalculateRectangularTower();
                    break;
                case 2:
                    CalculateTriangularTower();
                    break;
                case 3:
                    Console.WriteLine("Exiting program...");
                    break;
                default:
                    Console.WriteLine("Invalid choice. Please choose again.");
                    break;
            }

        } while (choice != 3);
    }

    static void CalculateRectangularTower()
    {
        Console.WriteLine("Enter height of the rectangular tower:");
        int height = int.Parse(Console.ReadLine());
        //Correctness check for the input of the height of the rectangle
        while (height < 2)
        {
            Console.WriteLine("Invalid height, Please enter again!");
            height = int.Parse(Console.ReadLine());
        }
        Console.WriteLine("Enter width of the rectangular tower:");
        int width = int.Parse(Console.ReadLine());
        //Checking whether it is a square or a rectangle with the difference between the lengths of the sides
        //His is greater than 5
        if (width - height > 5 || width == height)
        {
            Console.WriteLine("Area of the rectangular tower: " + (height * width));
        }
        else
        {
            Console.WriteLine("Perimeter of the rectangular tower: " + 2 * (height + width));
        }
    }

    static void CalculateTriangularTower()
    {
        Console.WriteLine("Enter height of the triangular tower:");
        int height = int.Parse(Console.ReadLine());
        Console.WriteLine("Enter width of the triangular tower:");
        int width = int.Parse(Console.ReadLine());

        Console.WriteLine("Choose an option:");
        Console.WriteLine("1. Calculation of the perimeter of the triangle");
        Console.WriteLine("2. Printing the triangle");

        int option = int.Parse(Console.ReadLine());

        switch (option)
        {
            case 1:
                //Calculating the perimeter by using the Pythagorean theorem
                double rib = Math.Sqrt(height * height + (width / 2) * (width / 2));
                Console.WriteLine("Perimeter of the triangle: " + (2 * rib + width));
                break;
            case 2:
                if (width % 2 == 0 || width > 2 * height)
                {
                    Console.WriteLine("The triangle cannot be printed.");
                }
                switch (width)
                {
                    case 1://Testing an edge case where the width are equal to 1
                        for (int i = 0; i < height; i++)
                            Console.WriteLine("*");
                        break;
                    case 3://Testing an edge case where the width are equal to 3
                        for (int i = 0; i < height; i++)
                            Console.WriteLine(" *");
                        Console.WriteLine("***");
                        break;
                    default:
                        string line;
                        //The star print at the top of the tower
                        line = new string(' ', width / 2) + new string('*', 1);
                        Console.WriteLine(line);
                        int midlleHeight = height - 2;//Calculation of the number of lines left to print from the height
                        int numOfOdd = width / 2 - 1;//Calculation of the odd number in the range up to the width
                        int numAsterisks = 3;
                        int numSpaces = (width - 3) / 2;
                        //Printing the number of excess lines
                        for (int i = 0; midlleHeight > 0 && i < midlleHeight % numOfOdd; i++)
                        {
                            line = new string(' ', numSpaces) + new string('*', numAsterisks);
                            Console.WriteLine(line);
                        }
                        //A loop that prints the rest of the queued rows excluding the base
                        for (int i = 1; midlleHeight > 0 && i < height - midlleHeight % numOfOdd; i++)
                        {

                            line = new string(' ', numSpaces) + new string('*', numAsterisks);
                            Console.WriteLine(line);
                            //When we reached an index where the remainder of dividing the index by the number of rows
                            //that need to be printed from each odd number is equal to 0,
                            //this means that we need to move to the next odd number
                            if (i % (midlleHeight / numOfOdd) == 0)
                            {
                                numAsterisks += 2;
                                numSpaces--;
                            }
                        }
                        break;
                }
                break;
            default:
                Console.WriteLine("Invalid option.");
                break;
        }
    }
}

