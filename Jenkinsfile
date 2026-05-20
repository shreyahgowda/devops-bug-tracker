pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/aishwaryasode028/bug-tracker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t bug-tracker .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 bug-tracker'
            }
        }
    }
}
