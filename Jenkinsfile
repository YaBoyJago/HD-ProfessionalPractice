pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Use the Node.js installation configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the repository...'
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']],  
                    userRemoteConfigs: [[url: 'https://github.com/YaBoyJago/HD-ProfessionalPractice.git', credentialsId: '2dfcb69e-e255-4ad8-b624-69dfe0d47b9a']],
                    extensions: [[$class: 'CleanCheckout']]  
                ])
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'  // Install project dependencies
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                
                // Run the app in the background
                sh 'npm start &'
                
                // Run tests
                sh 'npm test'

                // Kill the background process (app running on port 3000)
                sh 'fuser -k 3000/tcp || true'  // Ensure the app is killed after testing
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'

                // Run the app in the background using PM2 to keep it running
                sh 'pm2 stop my-app || true'
                sh 'pm2 delete my-app || true'
                sh 'pm2 start npm --name my-app -- start'

                // Ensure PM2 keeps the app running in the background
                sh 'pm2 save'
            }
        }

        stage('Release to Production') {
            steps {
                echo 'Releasing to production...'
                // Simulate production deployment (e.g., SSH to production server and deploy)
                echo 'Production deployment simulated in this environment...'
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Placeholder for monitoring setup (e.g., using PM2 monitoring or third-party tools)
                echo 'Monitoring setup would go here...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Ensure that any leftover processes are stopped
            sh 'pm2 stop my-app || true'
            sh 'pm2 delete my-app || true'
            sh 'fuser -k 3000/tcp || true'  // Ensure port 3000 is cleared
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
