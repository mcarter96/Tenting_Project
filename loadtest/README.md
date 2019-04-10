# Load Test

For load testing, we used a python framework called [Locust](https://locust.io/). To complete our load test, we used [Docker](https://www.docker.com/) to fire up instances to help with the server blocking up our IP address. It is possible to run the loadtest without Docker by installing locustio, `pip install locustio`, and running the following command: 
```
locust --host=https://tenting-rewards.gonzaga.edu
```

------------------------------
## To Start Docker Instances

Simply run the command 
```
docker-compose up
``` 
to generate a 'master' instance as well as one 'slave' instance. In order to bring up more 'slaves' to help distribute the load accross multiple systems, you can run 
```
docker-compose up --scale locust-worker=5
```
 where 5 is the total number of 'slaves' you want to have running.

---------------------------
## To Carryout Test
Navigate to [localhost:8089](http://localhost:8089) and input the number of users you want to simulate, and how many users you want to fire up per second. The number of users will be slowly built up across the distributed network.

-----------------------
## Results
To generate the results of the load test, we simply performed 10 different load tests, with users from 100-1000 inclusive incrementing by one hundred every time. We downloaded the results and the ran a python script against the files to see generate a bar chart of the average response time in milliseconds to the API. The bar chart for current data is saved as [Users_vs_response-time.pdf](Users_vs_response-time.pdf)

------------------------------------------------------
We used a tutorial located [here](https://wheniwork.engineering/load-testing-with-locust-io-docker-swarm-d78a2602997a) in order to get setup and follow out the load test. 