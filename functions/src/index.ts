import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

export const sendMassEmail = functions.database.ref('massMailer/{mailerId}').onWrite(change => {
    const snapshot = change.after;
    const val = snapshot.val();
    const mailOptions = {
        from: '"unWine Lounge"<unwinelounge.noreply@gmail.com>',
        to: val.emailList
    };

    mailOptions["subject"] = "unWine Lounge Up coming Event";
    mailOptions["text"] = val.emailMessage;
    
    return mailTransport.sendMail(mailOptions)
        .then(() => console.log('mail sent'))
        .catch(error => console.error('some went wrong with email', error))
})
