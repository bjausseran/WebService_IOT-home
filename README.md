# Express-TypeScript-Boilerplate

## Installation : 

### Node
```ts
npm install
# Create .env file (see Config below)
```

### TypeScript
```ts
npm install typescript --save-dev
```

### Prisma
```ts
sudo npm install --save-dev prisma
sudo npm install --save-dev dotenv-cli
sudo npx prisma generate --schema=./src/prisma/schema.prisma
```

### Docker
```ts
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
docker-compose -f ./src/docker/docker-compose.yml up
```


## Launch : 

```ts
npm start
```

## Config : 
### port : 
3000
### .env :
DATABASE_URL="postgresql://root:password@localhost:5432/docker?schema=public"
PRIVATEKEY_LOCATION="../auth/jwtRS256.pem"
PUBLICKEY_LOCATION="../auth/jwtRS256.pem.pub"
PASSPHRASE="webservice"
ALGORITHM="RS256"

## Endpoints

### Users

| METHOD | Route       | Query? | Body / Response                                  | Description |
| ------ | ----------- | ------ | ------------------------------------------------ | ----------- |
| GET    | /user       |        | UserGet[]                                        |             |
| GET    | /user/:id   |        | UserGet                                          |             |
| POST   | /user       |        | UserPost / {message: "created", id: number}      |             |
| POST   | /user/login |        | UserLogin  / {message: "success", token: string} |             |
| PATCH  | /user/:id   |        | UserUpdate                                       |             |
| DELETE | /user/:id   |        | N/A                                              |             |

### Actuators

| METHOD | Route         | Query? | Body / Response                                 | Description |
| ------ | ------------- | ------ | ----------------------------------------------- | ----------- |
| GET    | /actuator     | ?type  | Actuator[]                                      |             |
| GET    | /actuator/:id |        | Actuator                                        |             |
| POST   | /actuator     |        | ActuatorPost / {message: "created", id: number} |             |
| PATCH  | /actuator/:id |        | ActuatorUpdate                                  |             |
| DELETE | /actuator/:id |        | N/A                                             |             |

### Sensors

| METHOD | Route       | Query? | Body / Response                               | Description |
| ------ | ----------- | ------ | --------------------------------------------- | ----------- |
| GET    | /sensor     | ?type  | Sensor[]                                      |             |
| GET    | /sensor/:id |        | Sensor                                        |             |
| POST   | /sensor     |        | SensorPost / {message: "created", id: number} |             |
| PATCH  | /sensor/:id |        | SensorUpdate                                  |             |
| DELETE | /sensor/:id |        | N/A                                           |             |
