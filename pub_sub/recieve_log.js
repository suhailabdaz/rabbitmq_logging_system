const amqplib = require("amqplib")

const exchangename = "log"

const recievemess =async()=>{
    const connection = await amqplib.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangename,"fanout",{durable:true})
    const q = await channel.assertQueue("",{exclusive:true})
    channel.bindQueue(q.queue,exchangename,"")
    console.log("waiting at",q.queue);
    channel.consume(q.queue,message=>{
        if(message) console.log("recieved at",q.queue,"with",message.content.toString());
    },{noAck:true})
}

recievemess()