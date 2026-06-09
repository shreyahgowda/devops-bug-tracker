pipeline {

    agent any

    stages {

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
                docker stop bugtracker-container
                docker rm bugtracker-container
                docker run -d -p 3000:3000 --name bugtracker-container bug-tracker
                '''
            }
        }

    }

}