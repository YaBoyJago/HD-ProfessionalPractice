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
                echo 'Building the project and creating build artifact...'
                sh 'npm install'
                sh 'tar -czf build-artifact.tar.gz *'  // Creating a build artifact
            }
            post {
                success {
                    archiveArtifacts artifacts: 'build-artifact.tar.gz', fingerprint: true
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                echo 'Running ESLint for code quality analysis...'
                // Assuming ESLint is set up in the project
                sh 'npm run lint'
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying the app to test environment...'
                sh '''
                if lsof -i :3000 | grep LISTEN; then
                  echo "Stopping existing app on port 3000..."
                  kill -9 $(lsof -t -i :3000)
                fi
                nohup npm start &
                '''
            }
        }

        stage('Post-Deployment Verification') {
            steps {
                echo 'Verifying deployment in test environment...'
                // Add health checks or curl command to verify deployment
                sh 'curl http://localhost:3000 || exit 1'
            }
        }

        stage('Release to Production') {
            steps {
                echo 'Promoting the build to production...'
                // Add production deployment scripts
                sh '''
                echo "Deploying to production..."
                nohup npm start &
                '''
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                // Placeholder for monitoring script (could be New Relic, Datadog, etc.)
                sh '''
                echo "Monitoring production with Datadog/NewRelic..."
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh '''
            if lsof -i :3000 | grep LISTEN; then
              echo "Stopping app on port 3000..."
              kill -9 $(lsof -t -i :3000)
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
