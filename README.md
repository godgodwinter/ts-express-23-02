# port : 8002
# yarn dev

```bash
# development
yarn dev

# build
yarn build
```


last test:23-02-10

```bash
# TESTING RESULT with TS : 16ms / 4.91kb (postman)
wrk -t12 -c1000 -d60s --timeout 5s #link:8002/api/guest/katabijak
Running 1m test @ #link:8002/api/guest/katabijak
   12 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.32s   284.46ms   2.91s    91.54%
    Req/Sec    58.05     62.26   390.00     86.73%
  24963 requests in 1.00m, 118.42MB read
Requests/sec:    415.44
Transfer/sec:      1.97MB
```

```bash
# TESTING RESULT with Laravel  : 126ms / 4.78kb (postman)

 wrk -t12 -c1000 -d60s --timeout 5s #link:8008/api/guest/katabijak
Running 1m test @ #link:8008/api/guest/katabijak
  12 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.55s     1.40s    4.87s    58.06%
    Req/Sec     4.49      3.59    10.00     61.63%
  430 requests in 1.00m, 1.96MB read
  Socket errors: connect 0, read 430, write 0, timeout 399
Requests/sec:      7.16
Transfer/sec:     33.46KB
```

 




im running server on windows with xampp, and nodejs
and test with wrk tool on ubuntu wsl2

settings:
thread =12
conection=1000
duration=60
timeout=5

```bash
# command :
wrk -t12 -c400 -d30s --timeout 5s #link:8002/api/guest/katabijak  //ts
wrk -t12 -c400 -d30s --timeout 5s #link:8080/api/guest/katabijak //laravel
```