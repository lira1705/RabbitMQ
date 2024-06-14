const amqp = require("amqplib/callback_api");

const argv = yargs(hideBin(process.argv)).argv;

if (!argv.exchange || !argv.routingKey || !argv.url) {
  console.error(
    "Por favor, forneça o exchange, a chave de roteamento e a mensagem."
  );
  console.error(
    "Uso: node producer.js --exchange <exchange_name> --routingKey <routing_key> --message <message_text>"
  );
  process.exit(1);
}

const url = argv.url;
const exchange = argv.exchange;
const routingKey = argv.routingKey;

amqp.connect(url, (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, "topic", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      (error2, q) => {
        if (error2) {
          throw error2;
        }
        channel.bindQueue(q.queue, exchange, routingKey);
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          q.queue
        );
        channel.consume(
          q.queue,
          (msg) => {
            console.log(
              " [x] Received %s",
              msg.content.toString(),
              "from queue teste on consumer 1"
            );
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});

// node consumer_topic.js --exchange exchange_teste --routingKey "quick.orange.rabbit" --url <URL descrita na tarefa da spike>
