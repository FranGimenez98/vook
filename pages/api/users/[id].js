import { prisma } from "../../../utils/db";

async function handler(req, res) {
  const id = req.params;
  if (req.method === "GET") {
    try {
      const timeline = await prisma.user.findFirst({
        where: {
          userId: id,
        },
        select: {
          following: {
            select: {
              username: true,
              Vook: true,
            },
          },
        },
      });
      res.status(200).json(timeline);
    } catch (err) {
      return res.status(500).json({ message: console.error(err) });
    }
  }
}

export default handler;
