pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install' // Install dependencies
            }
        }

        stage('Test') {
            steps {
                echo 'Running Tests...'
                sh 'npm test' // Run the tests
            }
        }

        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // You can add SonarQube or other tools here. For now, we'll keep it simple.
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to Test Environment...'
                // Deploy to test environment, you can replace this with Docker or other tools
                sh 'npm start &'
            }
        }

        stage('Release to Production') {
            steps {
                echo 'Releasing to Production...'
                // Deploy to production, for now, we'll keep this simple
                sh 'npm start &'
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Monitoring the production environment...'
                // Add Datadog or New Relic integration here if needed
            }
        }
    }

    post {
        always {
            echo 'This will always run after all stages.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
