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

                // Ensure port 3000 is not in use before starting the app
                sh '''
                if lsof -i :3000 | grep LISTEN; then 
                  echo "Port 3000 is in use, freeing it...";
                  kill -9 $(lsof -t -i :3000);
                else
                  echo "Port 3000 is free";
                fi
                '''

                // Run the app in the background using nohup
                sh 'nohup npm start & sleep 5'

                // Run tests using npm
                sh 'npm test'

                // Kill the background app process after testing
                sh '''
                if lsof -i :3000 | grep LISTEN; then
                  echo "Stopping the app running on port 3000...";
                  kill -9 $(lsof -t -i :3000);
                fi
                '''
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to test environment...'

                // Ensure port is free before deployment
                sh '''
                if lsof -i :3000 | grep LISTEN; then 
                  echo "Port 3000 is in use, freeing it...";
                  kill -9 $(lsof -t -i :3000);
                else
                  echo "Port 3000 is free";
                fi
                '''

                // Run the app in the background for deployment
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
            // Ensure that any leftover processes on port 3000 are stopped
            sh '''
            if lsof -i :3000 | grep LISTEN; then
              echo "Cleaning up: Stopping any app running on port 3000...";
              kill -9 $(lsof -t -i :3000);
            else
              echo "No process found on port 3000.";
            fi
            '''
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more information.'
        }
    }
}
