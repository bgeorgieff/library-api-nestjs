import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail)
      .then(() => console.log(`Email successfully dispatched to ${mail.to}`))
      .catch((e) => {
        throw new Error(e);
      });

    return transport;
  }
}
