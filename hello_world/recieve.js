const amqplib = require("amqplib");
const quename = "hello"


const sendmessage = async()=>{
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel()
    await channel.assertQueue(quename,{durable:false})
    channel.consume(quename,msg=>{
        console.log("recieved",msg.content.toString());
    },{noAck:true})
}

sendmessage()