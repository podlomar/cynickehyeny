import { NextApiRequest, NextApiResponse } from "next";
import { addSubscriber } from "../../api-client";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email } = req.body;

  const result = await addSubscriber(email);
  if (result === 'error') {
    res.json({ status: 'error'});
    return;
  }
  
  res.json({ status: 'ok', ...result });
}

export default handler;