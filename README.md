# apouletude

## Build backend

```docker build -t backend:alpha -f server/Dockerfile  .```

## Run Backend

```docker run -d --name backendContainer -p 5000:5000 backend:alpha```


## Build frontend

```docker build -t frontend:alpha -f ./Dockerfile  .```

## Run frontend

```docker run -d --name frontendContainer -p 5000:5000 backend:alpha```



## Build relayer

```docker build -t relayer:alpha -f ./Dockerfile  .```