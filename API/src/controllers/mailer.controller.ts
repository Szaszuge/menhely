const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path');
const mailMan = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export const RenderMail = async (req, res, next) => {
    console.log(req.body);
    let to = req.body.to;
    let subject = req.body.subject;
    let content = req.body.content;
    let template = req.body.template;

    const templatePath = path.join(__dirname, 'templates', template + '.ejs');
    console.log("Signal recived.")
    ejs.renderFile(templatePath, {content}, async (err, html)=>{

        console.log("Render attempt.")
        if (err){
            return res.send(`Error rendering email template: ${err}`);
        }
        console.log("Render success.")
        const mailOptions = {
            from: 'Csipicsipi csapacsapa rubirubi rabaraba <' + process.env.SMTP_USER + '>',
            to: to,
            subject: subject,
            html: html
        }

        console.log("Options set.")
        try {
            console.log("Attempting to send mail.")
            let result = await mailMan.sendMail(mailOptions);
            return res.send({ message: 'Az e-mail elküldve!' });
            console.log("Successful attempt.")
        } catch(error){
            console.log("Failed attempt.")
            console.log(error)
            return res.send({ message: error });
            
        }
    });
}