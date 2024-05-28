const amqp = require("amqplib")

const exchangename = "headers_log"

const recieve= async()=>{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangename,"headers",{durable:false})
    const q = await channel.assertQueue("",{exclusive:true})
    console.log(`waiting for messages in ${q.queue} `);
    
        channel.bindQueue(q.queue,exchangename,"",{"type":"new","method":"google","x-match":"any"})

    channel.consume(q.queue,message=>{
        console.log(`recieved ${message.content.toString()} in routing key ${message.properties.headers}`);
    },{noAck:true})
}

recieve()