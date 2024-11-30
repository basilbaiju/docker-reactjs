pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-app" 
        SONARQUBE_URL = 'http://35.200.183.104:9000'
        SONARCUBE_TOKEN = credentials('sonarqube')
        NEXUS_REPO_URL = '15.207.102.181:8083/repository/react-app/' 
        NEXUS_CREDENTIALS_ID = 'nexuscred' 
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
                    sh '''
                    sonar-scanner \
                        -Dsonar.projectKey=react-app \
                        -Dsonar.host.url=$SONARQUBE_URL \
                        -Dsonar.login=$SONARCUBE_TOKEN
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'

                    // Tag the Docker image Nexus with build number and latest
                    sh 'docker tag $DOCKER_IMAGE $NEXUS_REPO_URL$DOCKER_IMAGE:$BUILD_NUMBER'
                    sh 'docker tag $DOCKER_IMAGE $NEXUS_REPO_URL$DOCKER_IMAGE:latest'
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

        stage('Push Docker Image to Nexus') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: "$NEXUS_CREDENTIALS_ID", 
                        usernameVariable: 'NEXUS_USERNAME', 
                        passwordVariable: 'NEXUS_PASSWORD'
                    )]) {
                        // Log in to Nexus Docker registry
                        sh '''
                        echo $NEXUS_PASSWORD | docker login http://$NEXUS_REPO_URL \
                        -u $NEXUS_USERNAME --password-stdin
                        '''

                        // Push the Docker image with the build number tag
                        sh 'docker push $NEXUS_REPO_URL$DOCKER_IMAGE:$BUILD_NUMBER'
                        sh 'docker push $NEXUS_REPO_URL$DOCKER_IMAGE:latest'
                    }
                }
            }
        }

        stage('Push Docker Image to dockerhub') {
            steps {
                script {

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
