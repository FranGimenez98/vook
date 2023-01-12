import { prisma } from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const id = req.body.id;
      const comment = await prisma.post.findUnique({
        where: {
          id: id,
        },
        select: {
          comments: true,
        },
      });

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }

  if (req.method === "POST") {
    try {
      const { postId, userUserId, message } = req.body;
      const newComment = await prisma.comment.create({
        data: {
          postId,
          userUserId,
          message,
        },
        include: {
          user: true,
        },
      });
      return res
        .status(200)
        .send({ message: "comment created succefully", newComment });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }

  if (req.method === "PUT") {
    try {
      const commnet = await prisma.comment.findUnique({
        where: { id: req.body.id },
      });
      const newComment = await prisma.comment.update({
        where: commnet,
        data: { message: req.body.message },
        select: { message: true, user: true },
      });

      return res
        .status(200)
        .send({ message: "comment upodated succefully", newComment });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }else if (req.method === "DELETE") {
    try {
      const deleteComment = await prisma.comment.delete({
        where: { id: req.body.id },
      });
      return res
        .status(200)
        .json({ message: "Deleted Successfully", deleteComment });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }
}

export default handler;
