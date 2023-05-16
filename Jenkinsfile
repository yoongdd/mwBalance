pipeline {
    agent none
    options { skipDefaultCheckout(false) }
    stages {
        stage('denpendencies install') {
            agent any
            steps {
                sh 'yarn install'
            }
        }
        stage('build source') {
            agent any
            steps {
                sh 'yarn build'
            }
        }
        stage('Build Image') {
            agent any
            steps {
                sh 'docker build -t reservation/nginx:v3 .'
            }
        }
        stage('Swarm service Update') {
            agent any
            steps {
                sh 'docker service update --force avengers_reservation_homepage'
                // sh 'docker stack deploy --compose-file=docker-compose.yml avengers_reservation'
            }
        }
    }
}