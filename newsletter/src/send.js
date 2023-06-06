import { findNewsletter, markAsSent, buildEmailData, getAllSubscribers, getTestSubscribers } from './db';
import { buildEmail } from './email';
import { MailerSend, Sender, Recipient, EmailParams } from 'mailersend';
import { render } from './render';

const mailerSend = new MailerSend({
  apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2IwODIwNzVlY2RjOTA0YjJlOTRhOTUzNmU1YWQwZWJjNjc0Mjk3ZmRmNjAyYTc2ZGE0MWZjOGNlZjk3ZTFlMjQ2NjlkZjBlYjc2N2VlNmQiLCJpYXQiOjE2NzMwMjYyOTEuMzY1MjQzLCJuYmYiOjE2NzMwMjYyOTEuMzY1MjQ1LCJleHAiOjQ4Mjg2OTk4OTEuMzYxNDY1LCJzdWIiOiI1MTQ5OSIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19mdWxsIiwiYWN0aXZpdHlfZnVsbCIsImFuYWx5dGljc19mdWxsIiwidG9rZW5zX2Z1bGwiLCJ3ZWJob29rc19mdWxsIiwidGVtcGxhdGVzX2Z1bGwiLCJzdXBwcmVzc2lvbnNfZnVsbCIsInNtc19mdWxsIiwiZW1haWxfdmVyaWZpY2F0aW9uX2Z1bGwiLCJpbmJvdW5kc19mdWxsIiwicmVjaXBpZW50c19mdWxsIl19.YfOIy5sHsizBKV57bSwfokk-HZO3oIjqwVnzT1c86DaDTyT8KATQLM84ZqeuS71zQc_jE3gjDYxdTfV8ELGdeg2L9DKZ1lZrI_jZc3KF5XWsl4D6InthU82GUhF8WbFfye6CsDpoF9vKQwTgSN_ltsZdwCoRVIHQNaY3syc0QVC1oMiSrFobPr9Oi2QO1Ee7NNwuAaFXcd-lHS4n2ZHHhMmOU_79z8Zv7Cs41WCoeHXQhh-QWwRFsIMbWMT3wk063cm96YbTdzZ1hH8wuS-wAFNRCWqtHBdEGCCeLHSa_xqeIlHDO2D2K4QmReR8cp8u9RNKfA148K7D4JYG8P8l9ropCC71DGbS432BOCT9n8p3umIunnDGAIGr3PBsxgegJFJwbvY_zfwKlDg5XO-HgqhbeCOEcIE9YkOh5TGPXrs-OD1JbWXP_Ynq7ODk-JnG8YEDABweOwWE-7iNKM2C7ai6nVf0ZWFqyCUQuq-T9y5i-8ki6_0ybOseOJSmdf7rg2sD1jdmcb2B2lV4FWHKeyXqBLD-aESwtAfjw_7xE0zAo2pd5oIc589__vr918iMAYs4UmCcmuoyPE8rnHsbuyuczAdG2MO1EooY9wUk2tADsuQO5oAIPiL_BwccaQX147735OEBaf9gdtbfxqAuqFTfAoOw56GF57u48QD2kFM',
});

export default (context) => async (req, res) => {
	const { id } = req.params;
	const { test } = req.query;

  try {
    const newsletter = await findNewsletter(context, id);
    
    let subscribers = null;
    if (test === 'true') {
      subscribers = await getTestSubscribers(context, id);
    } else {
      subscribers = await getAllSubscribers(context);
    }

    if (subscribers.length === 0) {
      res.send(render('send.njk', { 
        result: {
          ok: false,
          status: 'Error',
          error: 'There are no subscribers to send to',
        },
      }));
  
      return;
    }

    const emailData = await buildEmailData(context, newsletter);
    
    const sentFrom = new Sender("redakce@cynickehyeny.cz", "Cynické hyeny");

    const bulkEmails = subscribers.map((sub) => new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(sub.email)])
      .setSubject(test === 'true' ? `TEST!! ${emailData.title}` : emailData.title)
      .setHtml(buildEmail(emailData, sub.id))
    );

    const response = await mailerSend.email.sendBulk(bulkEmails);  
    if (response.statusCode === 202) {
      if (test !== 'true') {
        await markAsSent(context, id);
      }
      
      res.send(render('send.njk', { 
        result: {
          ok: true,
          status: 'Success',
        },
      }));
    }
  } catch (err) {
    res.send(render('send.njk', { 
      result: {
        ok: false,
        status: 'Error',
        error: JSON.stringify(err, null, 2),
      },
    }));
  }
};
