const amqp = require("amqplib")

const exchangename = "topic_log"
const args = process.argv.slice(2)
const logtype = args[0] 
const msg = args[1] || "hello world"

const emitmessage = async()=>{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangename,"topic",{durable:false})
    channel.publish(exchangename,logtype,Buffer.from(msg))
    console.log("sent => ",msg);
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
}

emitmessage()