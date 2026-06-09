pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t bug-tracker .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker rm -f bug-tracker-container 2>nul'
                bat 'docker run -d -p 3000:3000 --name bug-tracker-container bug-tracker'
            }
        }
    }
}
