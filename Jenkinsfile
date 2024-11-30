pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-app"
        SONARQUBE_URL = 'http://35.200.183.104:9000'
        SONARCUBE_TOKEN = credentials('sonarqube')
    }
    
    tools {
        nodejs 'node-22' 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/basilbaiju/docker-reactjs.git'
            }
        }
        
        stage('Sonarqube scanning') {
            steps {
                script {
                    sh 'sonar-scanner -Dsonar.projectKey=react-app -Dsonar.host.url=$SONARQUBE_URL -Dsonar.login=$SONARCUBE_TOKEN'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                    
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
