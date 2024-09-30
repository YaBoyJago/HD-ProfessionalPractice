pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Use the Node.js installation configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the repository...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the app...'

                // Stop any existing app running on port 3000
                sh '''
                if lsof -i :3000 | grep LISTEN; then
                  echo "Stopping existing app on port 3000..."
                  kill -9 $(lsof -t -i :3000)
                fi
                '''

                // Start the app in the background
                sh 'nohup npm start &'
            }
        }

        stage('Post-Deployment Verification') {
            steps {
                echo 'Verifying deployment...'
                // You can add health checks or verification steps here
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Optionally stop the app after the pipeline
            // sh 'kill -9 $(lsof -t -i :3000) || true'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
