FROM oven/bun:latest
WORKDIR /server
COPY package.json .
RUN bun i
COPY . .
CMD [ "bun", "start" ]