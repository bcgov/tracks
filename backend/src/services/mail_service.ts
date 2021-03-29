import nodemailer, {Transporter} from 'nodemailer';
import {CONFIG} from '../config';
import SMTPTransport from "nodemailer/lib/smtp-transport";

class MailService {

  private static instance: MailService;
  private transporter: Transporter;

  private constructor() {

    if (CONFIG.SMTP_ENABLED) {
      // we should have a real SMTP service

      const transporterConfig: SMTPTransport.Options = {
        host: CONFIG.SMTP_HOST,
        port: parseInt(CONFIG.SMTP_PORT),
      };

      if (CONFIG.SMTP_USERNAME != null && CONFIG.SMTP_USERNAME.trim().length > 0) {
        transporterConfig.auth = {
          user: CONFIG.SMTP_USERNAME,
          pass: CONFIG.SMTP_PASSWORD
        };
      }

      this.transporter = nodemailer.createTransport(transporterConfig)
    }
  }

  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }

    return MailService.instance
  }

  async sendMessage(to: string, subject: string, text: string, html: string, throwIfDisabled = false) {
    if (!this.transporter) {
      if (throwIfDisabled) {
        throw new Error("SMTP sender is not enabled in the configuration")
      }
      return
    }

    await this.transporter.sendMail(
      {
        from: CONFIG.SMTP_MAIL_FROM,
        to: to,
        subject: subject,
        text: text,
        html: html
      }
    );
  }

}

export {MailService};
