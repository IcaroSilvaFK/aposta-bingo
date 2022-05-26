import { NextApiRequest, NextApiResponse } from "next";

import { creaditCard } from "../../../services/credit_card";
import { debitCard } from "../../../services/debit_card";
import { pixType } from "../../../services/pix";
import { sendMail } from "../../../services/sendEmail";

export default async function pay(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;
  const { type } = request.query;

  if (method === "GET") {
    return response.status(404).json({ message: "Cannot get" });
  }

  if (method === "POST") {
    const { newTransaction } = request.body;
    let table = "";
    const sendEmail = {
      body: `<div>${table}</div>`,
    };

    if (!newTransaction) {
      return response.status(404).json({ message: "The fields are mandatory" });
    }
    switch (type) {
      case "credit_card": {
        try {
          const data = await creaditCard(newTransaction);

          await sendMail({
            name: newTransaction.customer.name,
            email: newTransaction.customer.email,
            body: sendEmail.body,
          });

          return response.status(404).json(data);
        } catch (error) {
          return response.status(500).json(error);
        }
      }
      case "debit_card": {
        try {
          const data = await debitCard(newTransaction);

          await sendMail({
            name: newTransaction.customer.name,
            email: newTransaction.customer.email,
            body: sendEmail.body,
          });

          return response.status(201).json(data);
        } catch (error) {
          return response.status(500).json(error);
        }
      }
      case "pix": {
        try {
          const data = await pixType(newTransaction);

          await sendMail({
            name: newTransaction.customer.name,
            email: newTransaction.customer.email,
            body: sendEmail.body,
          });

          return response.status(201).json(data);
        } catch (error) {
          return response.status(500).json(error);
        }
      }
    }
  }
}

// | "debit_card" | "boleto" | "pix"
