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

                // Ensure the port is not in use
                sh '''
                lsof -i :3000 | grep LISTEN && kill -9 $(lsof -t -i :3000) || echo "Port 3000 is free"
                '''

                // Run the app in the background using nohup (instead of pm2)
                sh 'nohup npm start &'

                // Run tests
                sh 'npm test'

                // Kill the background process after testing
                sh 'lsof -i :3000 | grep LISTEN && kill -9 $(lsof -t -i :3000) || echo "No process to kill"'
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'

                // Ensure port is free before deployment
                sh '''
                lsof -i :3000 | grep LISTEN && kill -9 $(lsof -t -i :3000) || echo "Port 3000 is free"
                '''

                // Run the app in the background using nohup
                sh 'nohup npm start &'
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
                // Placeholder for monitoring setup (e.g., using third-party tools)
                echo 'Monitoring setup would go here...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Ensure that any leftover processes are stopped
            sh 'lsof -i :3000 | grep LISTEN && kill -9 $(lsof -t -i :3000) || echo "No process to kill"'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
