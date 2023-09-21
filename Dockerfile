# Étape 1 : Construire l'application React
FROM node:14 as client-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm run build

# Étape 2 : Construire le serveur Node.js
FROM node:14 as server-build

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server ./

# Étape 3 : Exécuter l'application
FROM node:14

WORKDIR /app
COPY --from=client-build /app/client/build /app/client/build
COPY --from=server-build /app/server /app/server

CMD ["node", "server/server.js"]
