## How to reproduce

1. `$ npm start`
2. `$ curl -v --compressed http://localhost:3000/test-nestjs-error`

## Actual result

1. Response is empty
2. `onSend` handler triggers twice and there is error in the logs
```
"err":{"type":"Error","message":"premature close","stack":"Error: premature close\n    at onclosenexttick (/Users/s.n.grigorev/Projects/nestjs-compress-issue/node_modules/end-of-stream/index.js:54:86)\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)"},"msg":"premature close"}
```

## Additional info

1. Compression works if you run fastify without nestjs
```
$ npm run start:fastify
$ curl -v --compressed http://localhost:3000/test-fastify
```
2. It works if you decrease response payload.
3. It works if response is sent from controller
```
$ npm start
$ curl -v --compressed http://localhost:3000/test-fastify
```