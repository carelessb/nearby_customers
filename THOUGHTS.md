# My thoughts on the task

## Requirements based on [TASK.md](TASK.md):  
* read from a file (this is explicitly stated)
* write to a file (the output was ask to be put in a file so I may as well)
* Use the first distance formula on the Wiki page and no other (this is explicitly stated)
* runnable script
* fully tested code
* focus on production ready and "boring code"
* install, test, run and provide instructions


## Questions
* Should I pull the customer json data from the url provided on just place it in a file.  
    It is explicitly stated in [TASK.md](TASK.md) that a file should be used. 
* Validation
    * json of input lines
    * valid coordinates
* Performance
    * Do I have to take file size into account?
        * Can I just read the file all directly into memory?
        * Should I read line by line or in chunks?
            Line by line is a good compromise.
    * Is there a way that I can reduce the amount of processing I have to do for each distance calculation?
        * Could I memoize some of the distance calculation?
            The formula does not allow for this.
* allow for different office coordinates?  
    Nice to have.  
* allow for different distances nearby distances?  
    Nice to have.  
* allow for different units miles/kilometres?  
    Nice to have.
* Edge cases:  
    * Size of input file is very large?   
        I think we can ignore this for this task
    * No content in the file
    * invalid json in the file
     
