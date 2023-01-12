import { prisma } from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { postId, userUserId } = req.body;
      const like = await prisma.like.create({
        data: {
          postId,
          userUserId,
        },
        include: {
          user: true,
        },
      });
      return res.status(200).send({ message: "liked succefully", like });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const dislike = await prisma.like.delete({
        where: {id: id},
      });
      return res
        .status(200)
        .json({ message: "disliked Successfully", dislike });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }
}

export default handler;
