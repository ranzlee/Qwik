# Pre-reqs

* Install [Node.js](https://nodejs.org/en/)
* Install [VS Code](https://code.visualstudio.com/)

If using Docker (recommended)

* Install [Docker](https://www.docker.com/community-edition)
*

If local development (No Docker)

* Install [MongoDB](https://docs.mongodb.com/manual/installation/)
* Install [Redis](https://redis.io/)

# Getting started

* Clone the repository

```
git clone --depth=1 https://github.com/ranzlee/Qwik <project_name>
```

* Install dependencies

```
cd <project_name>
npm install
```

* If using Docker (recommended)

```
docker-compose build
docker-compose up
```

* If using Docker configuration is changed (recommended)

```
docker-compose down
docker-compose build
docker-compose up
```

* If local development (No Docker): Start your mongoDB server (you'll probably want another command prompt)

```
mongod
```

* Build and run the project

```
npm run start-dev
```

Navigate to `https://localhost:3000`
