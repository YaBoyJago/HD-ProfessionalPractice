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
                    branches: [[name: '*/main']],  // Use 'main' branch, adjust if necessary
                    userRemoteConfigs: [[url: 'https://github.com/YaBoyJago/HD-ProfessionalPractice.git', credentialsId: '2dfcb69e-e255-4ad8-b624-69dfe0d47b9a']],
                    extensions: [[$class: 'CleanCheckout']]  // Ensure a clean workspace before checkout
                ])
            }
        }

        // Stage 2: Build the project and create a build artifact (like a Docker image)
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'  // Install project dependencies
                echo 'Creating a Docker image as the build artifact...'
                // Build a Docker image for deployment
                sh 'docker build -t my-app-image .'  // Ensure you have a Dockerfile in the root directory
            }
        }

        // Stage 3: Run automated tests
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Run tests using Mocha or any other test framework
            }
        }

        // Stage 4: Code Quality Analysis using SonarQube (or any other tool)
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // Integrate SonarQube for code quality analysis
                // Replace 'sonar-scanner' with actual SonarQube command or script if you have it installed
                sh 'sonar-scanner -Dsonar.projectKey=MyApp -Dsonar.sources=src -Dsonar.host.url=http://localhost:9000 -Dsonar.login=your-sonar-token'
            }
        }

        // Stage 5: Deploy to Test Environment (Using Docker or another tool)
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'
                // Deploy the Docker container to a test environment
                sh 'docker run -d -p 3000:3000 --name my-app-test my-app-image'  // Replace with actual deployment process if needed
            }
        }

        // Stage 6: Release to Production (For example, using AWS Elastic Beanstalk or Docker)
        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                // Deploy to production (replace with real production deployment logic)
                // If using Docker, push the image to a registry and deploy to production
                sh 'docker tag my-app-image my-docker-repo/my-app-image:latest'
                sh 'docker push my-docker-repo/my-app-image:latest'
                // Add deployment to AWS Elastic Beanstalk, Kubernetes, etc., as required
            }
        }

        // Stage 7: Monitoring and Alerting (Optional, with tools like Datadog or New Relic)
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Set up Datadog, New Relic, or Prometheus to monitor the application
                // Replace the command below with real monitoring setup
                sh 'datadog-agent check'  // Example: Datadog Agent command
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Clean up resources (for example, stopping Docker containers)
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
