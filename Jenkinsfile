pipeline {
    agent any

    environment {
        REDIS_CONTAINER = 'my-redis'
        POSTGRES_CONTAINER = 'my-postgres'
        SERVER_CONTAINER = 'my-server'
        POSTGRES_USER = 'root'
        POSTGRES_PASSWORD = 'root'
        POSTGRES_DB = 'db'
        POSTGRES_URL = 'postgres'
        POSTGRES_PORT = '5432'
        PORT = '10000'
        REDIS_HOST = 'redis'
        REDIS_PORT = '6379'
        JWT_SECRET = 'qrUFW323rgrth43fewpo'
        SMTP_USER = 'molot2102@gmail.com'
        SMTP_PASSWORD = 'subasehcogfwhflz'
        URL_CLIENT = 'http://45.93.201.160:3000'
        DATABASE_URL = 'postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public'
    }

    stages {
        stage('Clean up old containers') {
            steps {
                script {
                    // Stop and remove existing containers if they exist
                    sh "docker stop ${REDIS_CONTAINER} || true"
                    sh "docker rm ${REDIS_CONTAINER} || true"
                    sh "docker stop ${POSTGRES_CONTAINER} || true"
                    sh "docker rm ${POSTGRES_CONTAINER} || true"
                    sh "docker stop ${SERVER_CONTAINER} || true"
                    sh "docker rm ${SERVER_CONTAINER} || true"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Start Redis container
                    sh "docker run -d --name ${REDIS_CONTAINER} -p ${REDIS_PORT}:${REDIS_PORT} -v redis-data:/data redis"

//                     // Start PostgreSQL container
//                     sh "docker run -d --name ${POSTGRES_CONTAINER} -e POSTGRES_USER=${POSTGRES_USER} -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -e POSTGRES_DB=${POSTGRES_DB} -p ${POSTGRES_PORT}:${POSTGRES_PORT} -v postgres-data:/var/lib/postgresql/data postgres"

                    // Build and start the server container
                    sh "docker build -t my-server ."
                    sh "docker run -d --name ${SERVER_CONTAINER} --env-file .env --link ${REDIS_CONTAINER} -p ${PORT}:${PORT} my-server yarn init:prod"
                }
            }
        }
    }
}
