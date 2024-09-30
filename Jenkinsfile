pipeline {
    agent any

    stages {
        // Stage 1: Checkout the repository from GitHub
        stage('Checkout') {
            steps {
                echo 'Checking out the repository...'
                // Explicitly checkout the repository using the correct branch and credentials
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']],  // Adjust 'main' to 'master' if needed
                    userRemoteConfigs: [[url: 'https://github.com/YaBoyJago/HD-ProfessionalPractice.git', credentialsId: '1a1cc6cb-8a76-4442-924e-5ed4f13d50c1']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'CleanCheckout']]  // Ensures workspace is cleaned before checkout
                ])
            }
        }

        // Stage 2: Build the project
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'  // Install project dependencies
            }
        }

        // Stage 3: Run automated tests
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Execute the tests defined in your package.json
            }
        }

        // Stage 4: Code Quality Analysis (placeholder for tools like SonarQube)
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // Placeholder for code analysis tools like SonarQube or ESLint
                // sh 'sonar-scanner'  // Uncomment if you have SonarQube or similar set up
            }
        }

        // Stage 5: Deploy to test environment
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                // You can add Docker or any other deployment steps here
                // For now, we'll assume a basic deployment using npm start
                sh 'npm start &'  // Starts the application in the background
            }
        }

        // Stage 6: Release to production
        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                // Add your production deployment steps here, possibly using Docker, AWS, etc.
                // For now, we assume the same npm start command (replace with actual production logic)
                sh 'npm start &'  // Deploys to production environment (replace with actual commands)
            }
        }

        // Stage 7: Monitoring and Alerting (optional)
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Placeholder for tools like Datadog, New Relic, or Prometheus
                // Add commands to set up monitoring here
            }
        }
    }

    // Post-build actions
    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
