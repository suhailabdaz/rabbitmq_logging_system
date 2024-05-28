const amqplib = require("amqplib");
const quename = "hello"
const msg = "hello world"


const sendmessage = async()=>{
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel()
    await channel.assertQueue(quename,{durable:false})
    channel.sendToQueue(quename,Buffer.from(msg))
    console.log("Sent message",msg);
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500);
}

sendmessage().catch(err=>{
    console.log("error",err);
})