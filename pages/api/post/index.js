import { prisma } from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, description, image, vookId, userUserId } = req.body;
      const createPost = await prisma.post.create({
        data: { title, description, image, vookId, userUserId },
        include: {
          User: true
        },
      });
      res
        .status(200)
        .json({ message: "Post successfully created", createPost });
    } catch (err) {
      return res.status(500).json({ message: console.log(err) });
    }
  }
}

export default handler;
