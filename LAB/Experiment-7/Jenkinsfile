pipeline {
    agent any

    environment {
        IMAGE_NAME = "harshitkumar22/myapp"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_TOKEN')]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login -u harshitkumar22 --password-stdin
                    '''
                }
            }
        }

        stage('Push to Docker Hub') { 
            steps {
                sh "docker push ${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        always {
            sh "docker logout || true"
        }
    }
}