# Use the official Node.js image as the base image
FROM node:20-alpine


WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

RUN npm install
RUN npm install -g dotenv
RUN npm install -g prisma

WORKDIR /usr/src/app/database
RUN npx prisma generate

WORKDIR  /usr/src/app

RUN npm run build



EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]