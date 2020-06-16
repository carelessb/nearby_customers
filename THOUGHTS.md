# My thoughts on the task

## Requirements based on [TASK.md](TASK.md):  
* read from a file (this is explicitly stated)
* write to a file (this is explicitly stated)
* runnable script
* fully tested code
* focus on production ready and "boring code"
* install, test, run instructions

		
## Personas:  
* Jean
    * Jean is a developer with Intercom
    * Jean uses GIT repos
    * Jean does not use nodejs or npm
    * Jean will evaluate the take home task based on 

## Questions
* Should I pull the customer json data from the url provided on just place it in a file.  
    It is explicitly stated in [TASK.md](TASK.md) that a file should be used.
	
## Tests:  
* Validation
    * json of input
    * valid coordinates
    * 
* Performance
    * Should I use the faster haversine formula or the more accurate (in edge cases) Vincenty formula?
    * Do I have to take file size into account?
        * Can I just read the file all directly into memory?
        * Should I read line by line or in chunks?
    * Is there a way that I can reduce the amount of processing I have to do for each distance calculation?
        * Could I memoize some of the distance calculation?
* allow for different coordinates?
* allow for different distances?
* allow for different units miles/kilometres?
* Edge cases:  
    * Size of input file is very large?
    * No content in the file
    * invalid json in the file
     
