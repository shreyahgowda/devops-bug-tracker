pipeline {

    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/shreyahgowda/devops-bug-tracker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t bug-tracker .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat '''
                docker stop bugtracker-container || exit 0
                docker rm bugtracker-container || exit 0
                docker run -d -p 3000:3000 --name bugtracker-container bug-tracker
                '''
            }
        }

    }
}