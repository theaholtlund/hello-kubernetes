# The World of Kubernetes

This is an entry-level Kubernetes application, aiming to learn the fundamental principles of the technology.

### Prerequisites

Before starting, ensure the following are installed:

- Docker, or download it [here](https://docs.docker.com/get-docker/).
- Minikube, or download it [here](https://minikube.sigs.k8s.io/docs/start/).
- Kubectl, or download it [here](https://minikube.sigs.k8s.io/docs/start/).
- Node.js, or download it [here](https://nodejs.org/en/download).

### Setup and Running Instructions

1. Ensure Minikube is running:

```
minikube start
```

2. Set environment to ensure Docker daemon and Minikube are using the same Docker engine:

```
eval $(minikube docker-env)
```

3. Build the Docker image:

```
docker build -t hello-kubernetes-node .
```

4. Start app by deploying Kubernetes manifests:

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

5. Create a Minikube service tunnel to access the application

```
minikube service hello-kubernetes-service
```

### Local Testing Before Building

To speed up the development process and test the web application locally without rebuilding Docker images and redeploying containers, follow these steps:

1. Install live reload with live-server, here globally:

```
npm install -g nodemon live-server
```

2. Run the app with Node.js server, using nodemon commands:

```
nodemon start
```

### Managing the Application

- Get K8s deployments:
  ```
  kubectl get deployments
  ```
- Get K8s pods:
  ```
  kubectl get pods
  ```
- Get K8s services:
  ```
  kubectl get services
  ```

### Stopping and Starting Processes

- Start Minikube:
  ```
  minikube start
  ```
- Stop Minikube:
  ```
  minikube stop
  ```
- Delete deployments and services:
  ```
  kubectl delete -f deployment.yaml
  kubectl delete -f service.yaml
  ```
