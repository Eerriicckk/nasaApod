sudo docker stop container_nasa_apod
sudo docker rm container_nasa_apod
sudo docker rmi nasa_apod
sudo docker build -t nasa_apod .
sudo docker run -d --name container_nasa_apod -p 5173:5173 nasa_apod