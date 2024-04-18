# The World of Kubernetes

This is an entry-level Kubernetes application, aiming to learn the fundamental principles of the technology.

### Prerequisites

Before starting, ensure the following are installed:

- Docker, or download [here](https://docs.docker.com/get-docker/)
- Minikube, or download [here](https://minikube.sigs.k8s.io/docs/start/)
- Kubectl, or download [here](https://minikube.sigs.k8s.io/docs/start/)
- Node.js, or download [here](https://nodejs.org/en/download)

### Setup and Running Instructions

1. Ensure minikube is running:

```
minikube start
```

2. Ensure Docker daemon is using the same Docker engine as Minikube:

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

5. Find the Minikube IP address

```
minikube ip
```

6. Access the application, which default is exposed on port 30001
