pipeline {
    agent any

    environment {
        REDIS_CONTAINER = 'my-redis'
        POSTGRES_CONTAINER = 'my-postgres'
        SERVER_CONTAINER = 'my-server'
        POSTGRES_USER = 'root'
        POSTGRES_PASSWORD = 'root'
        POSTGRES_DB = 'db'
        POSTGRES_URL='postgres'
        POSTGRES_PORT='5432'
        PORT='10000'
        REDIS_HOST='redis'
        REDIS_PORT='6379'
        JWT_SECRET='qrUFW323rgrth43fewpo'
        SMTP_USER='molot2102@gmail.com'
        SMTP_PASSWORD='subasehcogfwhflz'
        URL_CLIENT='http://45.93.201.160:3000'
        DATABASE_URL='postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Start Redis container
                    sh "docker run -d --name ${REDIS_CONTAINER} -p 6379:6379 -v redis-data:/data redis"

                    // Start PostgreSQL container
                    sh "docker run -d --name ${POSTGRES_CONTAINER} -e POSTGRES_USER=${POSTGRES_USER} -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -e POSTGRES_DB=${POSTGRES_DB} -p 5432:5432 -v postgres-data:/var/lib/postgresql/data postgres"

                    // Build and start the server container
                    sh "docker build -t my-server ."
                    sh "docker run -d --name ${SERVER_CONTAINER} --env-file .env --link ${REDIS_CONTAINER} --link ${POSTGRES_CONTAINER} -p 10000:10000 my-server yarn init:prod"
                }
            }
        }
    }
}
