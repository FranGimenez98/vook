import { prisma } from "../../utils/db";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, followingId } = req.body;
      const follow = await prisma.user.update({
        where: {
          userId: id,
        },
        data: {
          following: {
            disconnect: {
              userId: followingId,
            },
          },
        },
      });
      res.status(201).json({ message: "Following", follow });
    } catch (err) {
      return res.status(201).json({ message: console.log(err) });
    }
  }
}
export default handler;
