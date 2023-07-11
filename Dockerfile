# Dockerfile

FROM node:18.15.0

# env
ENV PORT = 3000
ENV POSTGRES_PRISMA_URL = 'postgres://prisma_database_user:a1E4ibJOYeDy4006EGl5E4NAdrG5dNER@dpg-cimbv3unqqldjqjmfgqg-a.oregon-postgres.render.com/prisma_database'

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# COPY
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build
RUN npm run postinstall

# define port
EXPOSE 3000/tcp

# Start the server using the production build
CMD [ "node", "dist/index" ]
