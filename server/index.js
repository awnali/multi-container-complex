const express = require("express"),
  bodyParser = require("body-parser"),
  redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST
});

const redisPub = redisClient.duplicate();

const app = express();
app.use(bodyParser.json());

app.post("/api/values/add", function(req, res) {
  const index = req.body.index;
  redisPub.publish("insert", index, function() {
    res.status(200).json("published");
  });
});

app.get("/api/values", function(req, res) {
  redisClient.hgetall("values", function(err, values) {
    res.send(values);
  });
});

app.listen(3001, function() {
  console.log("listening on  3001");
});
