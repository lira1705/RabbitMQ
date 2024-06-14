# RabbitMQ

Para usar esse repo basta rodar o consumer em um terminal com o comando

node consumer_topic.js --exchange exchange_teste --routingKey "quick.orange.rabbit" --url [URL amazonMQ]

E enviar uma mensagem para ele acionando o producer

node producer_topic.js --exchange exchange_teste --routingKey "quick.orange.rabbit" --message "Hello World" --url [URL amazonMQ]
