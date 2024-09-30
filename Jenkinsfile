pipeline {
    agent any
    tools {
        // Specify the Node.js installation configured in Jenkins Global Tool Configuration
        nodejs 'NodeJS'  // Use the name you configured for Node.js in Jenkins Global Tool Configuration
    }

    stages {
        // Stage 1: Checkout the repository
        stage('Checkout') {
            steps {
                echo 'Checking out the repository...'
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']],  // Ensure 'main' is the correct branch, change to 'master' if needed
                    userRemoteConfigs: [[url: 'https://github.com/YaBoyJago/HD-ProfessionalPractice.git', credentialsId: '2dfcb69e-e255-4ad8-b624-69dfe0d47b9a']],
                    extensions: [[$class: 'CleanCheckout']]  // Clean workspace before checkout
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
                sh 'npm test'  // Run tests (ensure you have a test script in package.json)
            }
        }

        // Stage 4: Code Quality Analysis (Optional)
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // You can integrate tools like SonarQube here for code quality analysis
                // Placeholder for SonarQube or any other code quality tool
                // e.g., sh 'sonar-scanner'
            }
        }

        // Stage 5: Deploy to Test Environment
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                // You can use Docker, Kubernetes, or other deployment tools
                // Here, just running `npm start` as a placeholder
                sh 'npm start &'  // Starts the app in the background
            }
        }

        // Stage 6: Release to Production
        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                // Replace this with your production deployment logic (e.g., Docker, AWS, etc.)
                // Here, just running `npm start` as a placeholder
                sh 'npm start &'  // Starts the app in the background (update this for real prod deploy)
            }
        }

        // Stage 7: Monitoring and Alerting (Optional)
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Integrate monitoring tools like Datadog, New Relic, or Prometheus here
                // Placeholder for monitoring tool setup
            }
        }
    }

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
