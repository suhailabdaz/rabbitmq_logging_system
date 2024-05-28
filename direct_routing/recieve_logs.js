const amqp = require("amqplib")


const args = process.argv.slice(2)

const exchangename = "direct_log"

const recieve= async()=>{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangename,"direct",{durable:false})
    const q = await channel.assertQueue("",{exclusive:true})
    console.log(`waiting for messages in ${q.queue} for ${args}`);
    args.forEach(function(severity){
        channel.bindQueue(q.queue,exchangename,severity)
    })
    channel.consume(q.queue,message=>{
        console.log(`recieved ${message.content.toString()} in routing key ${message.fields.routingKey}`);
    },{noAck:true})
}

recieve()