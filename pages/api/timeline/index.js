import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    const limit = 6;
    const cursor = req.query.cursor ?? "";
    const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor) };

    try {
      const session = await getSession({ req });
      const data = await prisma.user.findFirst({
        where: {
          // userId: req.body.userId,
          userId: session.user.userId,
        },

        select: {
          userId: true,
          username: true,
          email: true,
          firstName: true,
          following: {
            select: {
              Post: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  image: true,
                  User: true,
                  likes: true,
                  comments: {
                    select: {
                      message: true,
                      user: true,
                      parent: true,
                      children: true,
                    },
                  },
                },
                orderBy: {
                  description: "desc",
                },
                skip: cursor !== "" ? 1 : 0,
                cursor: cursorObj,
                take: limit,
              },
            },
          },
        },
      });

      const timeline2 = data?.following
      
      const nox = timeline2.map((post) => post.Post)
      const chipa = nox.map((p) => p)
      const timeline = chipa.flat();

      return res.json({
        timeline,
        // nextId: timeline.length !== limit | timeline.length === limit ? timeline[limit - 1].id : undefined
        nextId: timeline?.length >= limit ? timeline[limit - 1].id : undefined,
      });
      //   .json({
      //     timeline,
      //     nextId: timeline.length === limit ? posts[limit - 1].id : undefined,
      //   });
    } catch (err) {
      return res.status(500).json(console.log(err));
    }
  }
}

export default handler;
