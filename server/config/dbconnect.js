const { default: mongoose } = require('mongoose')

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)

        if (conn.connection.readyState === 1) console.log('Db connection is succesfully')
        else console.log('Db connectiing')
    } catch (error) {
        console.log('Db connection is failed')
    }
}

module.exports = dbConnect
