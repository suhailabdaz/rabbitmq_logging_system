const amqp = require("amqplib")

const exchangename = "headers_log"
const args = process.argv.slice(2)
const msg = args[1] || "hello world"

const emitmessage = async()=>{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangename,"headers",{durable:false})
    channel.publish(exchangename,"",Buffer.from(msg),{headers:{type:"new",method:"google"}})
    console.log("sent => ",msg);
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
}

emitmessage()