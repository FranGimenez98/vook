import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      const profile = await prisma.user.create({
        data: {
          username,
          email,
          password: bcryptjs.hashSync(password),
          image:
            "http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8-300x300.jpg",
        },
      });

      return res.status(200).json(profile);
    } catch (error) {
      return res.status(500).send(error, console.log(error));
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.body;
      const { firstName, lastName, image, banner, description } = req.body;
      const follow = await prisma.user.update({
        where: {
          userId: id,
        },
        data: {
          image,
          banner,
          firstName,
          lastName,
          description,
        },
      });
      res.status(201).json({ message: "Following", follow });
    } catch (err) {
      return res.status(201).json({ message: console.log(err) });
    }
  }
}

export default handler;
