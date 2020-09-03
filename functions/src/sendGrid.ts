const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
sgMail.setSubstitutionWrappers('{{', '}}');

export const sendEmail = async (body: any) => {
  const messsage = {
    personalizations: [
      {
        to: [
          {
            email: 'joffrey.hernandez@gmail.com',
            name: 'Joffrey HERNANDEZ',
          },
        ],
        dynamic_template_data: body,
      },
    ],
    from: {
      email: 'joffrey.hernandez@gmail.com',
      name: 'Joffrey HERNANDEZ',
    },
    reply_to: {
      email: 'joffrey.hernandez@gmail.com',
      name: 'Joffrey HERNANDEZ',
    },
    templateId: 'd-b3e3fdfe6b3044c79b5521c82d5fd805',
  };
  return sgMail.send(messsage);
};

