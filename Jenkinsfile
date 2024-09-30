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

        // Stage 2: Build the project and Docker image creation
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'  // Install project dependencies

                // Docker build to create a container for the app
                echo 'Creating build artifact (Docker image)...'
                sh 'docker build -t my-app-image .'  // Ensure Dockerfile exists in the root
            }
        }

        // Stage 3: Run automated tests
        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test'  // Run tests using Mocha or other frameworks (e.g., Selenium or JUnit for other applications)
            }
        }

        // Stage 4: Code Quality Analysis with SonarQube or CodeClimate
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // Ensure SonarQube is properly configured in your Jenkins environment or use CodeClimate
                sh '''
                sonar-scanner \
                  -Dsonar.projectKey=my-app \
                  -Dsonar.sources=src \
                  -Dsonar.host.url=http://localhost:9000 \
                  -Dsonar.login=your-sonar-token
                '''
            }
        }

        // Stage 5: Deploy to Test Environment using Docker
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                // Run the Docker container in the test environment
                sh 'docker run -d -p 3000:3000 --name my-app-test my-app-image'  // Deploy the app to a container
            }
        }

        // Stage 6: Release to Production (using Docker or another deployment tool)
        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                // Tag and push Docker image to a Docker registry like Docker Hub or AWS ECR
                sh '''
                docker tag my-app-image my-docker-repo/my-app-image:latest
                docker push my-docker-repo/my-app-image:latest
                '''
                // Here, you can add production deployment logic for services like AWS, Kubernetes, or Elastic Beanstalk
                echo 'Production deployment would go here...'
            }
        }

        // Stage 7: Monitoring and Alerting (Optional, with Datadog or New Relic)
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Example placeholder command for monitoring setup
                // For Datadog, it could be a command like this (requires the Datadog agent):
                // sh 'datadog-agent check'
                // For Prometheus, ensure you have proper metrics exposed in the app
                echo 'Monitoring setup would go here...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Clean up Docker containers after deployment
            sh 'docker stop my-app-test || true'
            sh 'docker rm my-app-test || true'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
