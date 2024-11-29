pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/basilbaiju/docker-reactjs.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -it $DOCKER_IMAGE .'
                    
                    // Tag the Docker image
                    sh 'docker tag $DOCKER_IMAGE $DOCKER_IMAGE:latest'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Deploy the app using docker-compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean up workspace after pipeline execution
        }
    }
}

