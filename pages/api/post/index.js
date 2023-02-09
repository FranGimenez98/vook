import { prisma } from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, description, image, vookId, userUserId } = req.body;
      const createPost = await prisma.post.create({
        data: { title, description, image, vookId, userUserId },
        include: {
          User: true,
        },
      });
      res
        .status(200)
        .json({ message: "Post successfully created", createPost });
    } catch (err) {
      return res.status(500).json({ message: console.log(err) });
    }
  }
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      const { title, description } = req.body;

      const newPost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          description,
        },
        select: { title: true, description: true },
      });

      return res
        .status(200)
        .send({ message: "post upodated succefully", newPost });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const deletePost = await prisma.post.delete({
        where: { id },
      });
      return res
        .status(200)
        .json({ message: "Deleted Successfully", deletePost });
    } catch (err) {
      return res.status(500).send(err, console.log(err));
    }
  }
}

export default handler;
