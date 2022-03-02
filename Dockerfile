FROM node:14-alpine as clipps-app
LABEL maintainer="tonymtz <hello@tonymtz.com>"
ARG REACT_APP_ENV=$REACT_APP_ENV
WORKDIR /app
COPY . .
RUN npm install --silent
# RUN CI=true npm test
RUN npm run build

FROM nginx:alpine
COPY --from=clipps-app /app/build /usr/share/nginx/html
