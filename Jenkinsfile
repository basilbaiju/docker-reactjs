pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-app" 
    }

    tools {
        nodejs 'node-22' 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'reddis', url: 'https://github.com/basilbaiju/docker-reactjs.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker-compose build'

                  
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
            cleanWs() 
        }
    }
}
