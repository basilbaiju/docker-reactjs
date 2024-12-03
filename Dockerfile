FROM node:22 AS builder
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent && npm install react-scripts@5.0.1 -g --silent
COPY . /usr/src/app
RUN npm run build
FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
