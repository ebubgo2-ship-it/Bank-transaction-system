const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    }
})

// VERIFY THE CONNECTION CONFIGURATION
transporter.verify((error, success) => {
    if(error){
        console.error("error connecting to email server:", error)
    } else {
        console.log("email server is ready to send messages")
    }
})

// FUNCTION TO SEND EMAIL
const sendEmail = async (to, subject, text, html) => {
    try{
        const info = await transporter.sendMail({
            from:`"backend ledger <${process.env.EMAIL_USER}>`, //sender address
            to, //list of receivers
            subject, //subject line
            text, // plain text body
            html, // html body
        })

        console.log("message sent: %s", info.messageId)
        console.log("preview URL: %s", nodemailer.getTestMessageUrl(info))
    } catch (error) {
        console.error("error sending email", error)
    }
}

async function sendRegistrationEmail(userEmail, name) {
    const subject = "welcome to backend ledger"
    const text = `hello ${name}, \n\nThank you for registering. we are excited to have you on board`
    const html =`<p>hello ${name},</p><P>your transaction of $${amount} to account ${toAccount} was successful</p>`

    await sendEmail(userEmail, subject, text, html)
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = "transaction successsful"
    const text = `hello ${name}, \n\nyour transaction of $${amount} was successful`
    const html =`<p>hello ${name},</p><p>your transaction of $${amount} to account ${toAccount} was successful</p>`

    await sendEmail(userEmail, subject, text, html)
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = `Transaction failed`
    const text = `hello ${name},\n\nwe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed`
    const html = `<p>hello ${name},</P><P>we regret to inform you that your transactionof $${amount} to account ${toAccount} has failed</p>`

    await sendEmail(userEmail, subject, text, html)
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
}