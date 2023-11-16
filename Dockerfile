# Use the official Node.js image as the base image
FROM node:20-alpine


WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

RUN npm install
RUN npm install -g dotenv
RUN npm install  prisma
RUN npm install -g typescript


#WORKDIR /app/server/database
#RUN npx prisma generate


#WORKDIR  /app
RUN rm -rf server

RUN npm run build



EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]