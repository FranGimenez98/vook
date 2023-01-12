import { prisma } from "../../../utils/db";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, description, userUserId } = req.body;
      const newVook = await prisma.vook.create({
        data: { title, description, userUserId },
        include: {
          User: true,
        },
      });

      return res
        .status(200)
        .json({ message: "Vook created succesfully", newVook });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const vook = await prisma.vook.delete({
        where: { id },
      });
      return res.status(200).send({ message: `successfully deleted ${vook}` });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      const { title, description } = req.body;
      const vook = await prisma.vook.update({
        where: {
          id,
        },
        data: {
          title,
          description,
        },
      });
      return res.status(200).json(vook);
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }
}

export default handler;
