const amqp = require("amqplib/callback_api");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

if (!argv.exchange || !argv.routingKey || !argv.message || !argv.url) {
  console.error(
    "Por favor, forneça o exchange, a chave de roteamento e a mensagem."
  );
  console.error(
    "Uso: node producer.js --exchange <exchange_name> --routingKey <routing_key> --message <message_text>"
  );
  process.exit(1);
}

const exchange = argv.exchange;
const routingKey = argv.routingKey;
const msg = argv.message;
const url = argv.url;

amqp.connect(url, (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, "topic", { durable: false });

    channel.publish(exchange, routingKey, Buffer.from(msg), { expiration });
    console.log(" [x] Sent %s: '%s'", routingKey, msg);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});

// node producer_topic.js --exchange exchange_teste --routingKey "quick.orange.rabbit" --message "Hello World" --url <URL descrita na tarefa da spike>
