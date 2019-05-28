import { Alert } from 'react-native';
import Mailer from 'react-native-mail';

const sendEmail = ({ subject, body, attachment: { path, type } = { path: '', type: '' } }) => {
  Mailer.mail(
    {
      subject,
      recipients: [],
      ccRecipients: [],
      bccRecipients: [],
      body,
      attachment: {
        path, // The absolute path of the file from which to read data.
        type, // Mime Type: jpg, png, doc, ppt, html, pdf, csv
      },
    },
    (error, event) => {
      Alert.alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.tron.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.tron.log('CANCEL: Email Error Response') },
        ],
        { cancelable: true },
      );
    },
  );
};

export { sendEmail };
