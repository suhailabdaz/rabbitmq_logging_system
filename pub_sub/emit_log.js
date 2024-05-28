const amqplib = require("amqplib")

const exchangename = "log"
const message = process.argv.slice(2).join("") || "hello world"

const sendmess=async()=>{
    const connection = await amqplib.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangename,"fanout",{durable:true})
    channel.publish(exchangename,"",Buffer.from(message))
    console.log("sent => ",message);
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
}

sendmess()