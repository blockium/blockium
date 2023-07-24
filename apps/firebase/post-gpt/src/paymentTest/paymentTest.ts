import { https } from 'firebase-functions';
import cors from 'cors';

export const paymentTest = https.onRequest(async (request, response) => {
  // TODO: Review CORS policy
  const corsObj = cors({ origin: true });
  corsObj(request, response, async () => {
    try {
      // TODO Get the payment data from request.body
      // const {} = request.body;
      console.log(request.body);

      response.status(200).send('OK');
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao processar o pagamento.');
    }
  });
});
