pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Use the Node.js installation configured in Jenkins Global Tool Configuration
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

        // Stage 2: Build the project (packaging instead of Docker)
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'  // Install project dependencies

                // Simulate creating a build artifact by zipping the project files
                echo 'Creating build artifact...'
                sh 'zip -r my-app-artifact.zip *'  // This creates a zip archive of the project
            }
        }

        // Stage 3: Run automated tests
        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test'  // Run tests using Mocha or other frameworks
            }
        }

        // Stage 4: Code Quality Analysis with SonarQube or another tool
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // Use SonarQube or CodeClimate if set up
                sh '''
                sonar-scanner \
                  -Dsonar.projectKey=my-app \
                  -Dsonar.sources=src \
                  -Dsonar.host.url=http://localhost:9000 \
                  -Dsonar.login=your-sonar-token
                '''
            }
        }

        // Stage 5: Deploy to Test Environment without Docker
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                // Run the application in the background as a placeholder for deployment
                sh 'npm start &'  // Deploys the app locally for testing
            }
        }

        // Stage 6: Release to Production (simulate deployment)
        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                // Simulate a production deployment. This can be AWS, Elastic Beanstalk, or another service.
                echo 'Production deployment logic would go here...'
                sh 'npm start &'  // Simulate running the application in production
            }
        }

        // Stage 7: Monitoring and Alerting (Optional)
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Placeholder for setting up monitoring tools like Datadog, Prometheus, etc.
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Clean up after the test run
            sh 'pkill -f "npm start" || true'  // Stop the running instance of the app
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
