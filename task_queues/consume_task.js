const amqplib = require("amqplib")

const queuename = "task"

const recievemessage =async()=>{
    const connection = await amqplib.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertQueue(queuename,{durable:true})
    channel.prefetch(1)
    await channel.consume(queuename,message=>{
            const secs = message.content.toString().split(".").length-1
            console.log("recieved"+message.content.toString());
            setTimeout(()=>{
                console.log("done resizing image");
                channel.ack(message)
            },secs *1000)
    },{noAck:false})
}

recievemessage()