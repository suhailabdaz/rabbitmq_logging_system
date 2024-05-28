const amqplib = require("amqplib")

const message = process.argv.slice(2).join(" ") || "hello world"

const queuename = "task"

const sendmessage =async()=>{
    const connection = await amqplib.connect("amqp://localhost")
    const channel  = await connection.createChannel()
    await channel.assertQueue(queuename,{durable:true})
    channel.sendToQueue(queuename,Buffer.from(message),{persistent:true})
    console.log("sent => ", message);
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
}

sendmessage()