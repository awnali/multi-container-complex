const redis = require("redis"),
  redisClient = redis.createClient({ host: process.env.REDIS_HOST });

const sub = redisClient.duplicate();

sub.on("message", function(channel, index) {
  console.log("message recieved", index);
  redisClient.hset(
    "values",
    index,
    calculateFibonacciNumber(index),
    function() {
      redisClient.hget("values", index, function(err, val) {
        redisClient.publish("new", val);
      });
    }
  );
});

sub.subscribe("insert");

function calculateFibonacciNumber(
  reqIndex = 0,
  i = 0,
  firstNumber = 0,
  secondNumber = 1
) {
  if (reqIndex === 0) return 0;
  if (reqIndex === 1) return 1;
  if (i >= reqIndex - 2) {
    return firstNumber + secondNumber;
  }
  return calculateFibonacciNumber(
    reqIndex,
    ++i,
    secondNumber,
    firstNumber + secondNumber
  );
}
