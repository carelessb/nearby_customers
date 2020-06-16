# Nearby Customers task

This is a take home interview task for Intercom.  
The task is outlined in [TASK.md](TASK.md)

My thoughts on how I interpreted and approached the task are outlined in [THOUGHTS.md](THOUGHTS.md)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to have Nodejs installed.
Follow this instructions on the [official website](https://nodejs.org/)
This installation will be specific to your operating system.

Check that you have npm and nodejs installed by running the following commands:
```
node -v
npm -v
```

### Installing

* Download the application to a directory in your filesystem:
https://github.com/carelessb/nearby_customers/archive/master.zip

* Unzip the file

* Install using the following commands
    ```
    cd nearby_customers
    npm install
    npm link
    ``` 

## Running the script

The script can be run using the inviteList command.   
There are command variables to allow different input to be used.  
You can use the --help variable to see what the options are:  
```
inviteList --help
```

## Examples:

* Run with default values.   
This uses the input and output files in /files  
    ```
        inviteList
    ``` 
    The command outputs the results into the console. Example:
    > The 16 invited customer names and user IDs have been saved to:  
    > C:\Users\carel\IdeaProjects\nearby_customers\src./../files/output.txt
    >
    >Input values:  
    >  Office location: 53.339428 -6.257664  
    > Invite radius: 100 kms  
    >  Input file: 
    >  C:\Users\carel\IdeaProjects\nearby_customers\src./../files/input.txt

* Run using a custom input file and output files
    ```
        inviteList --inputFile=customInputFile.txt  --outputFile=customOutputFile 
    ``` 

* Run using custom coordinates
    ```
        inviteList --latitude=53.0  --longitude=-9.1 
    ``` 


* Run using custom invite range
```
    inviteList --nearbyRadius=250
```

## Running the tests

* Set the current working directory of your command console to the application root and run this command:
```
test
``` 
* To run the tests with coverage stats run this command:
```
test --coverage
```


## Built With

* [nodejs](https://nodejs.org/) - The web framework used
* [npm](https://www.npmjs.com/) - Package Manager

## Authors

* **Liam Cantwell** - *All work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
