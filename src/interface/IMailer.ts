

export type MailData = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
    //headers: { 'x-myheader': 'test header' }
};
export interface IMailer {
    sendEmail : (mailData: MailData) => any
}