// import { prisma } from "../../utils/db";
// import { getSession } from "next-auth/react";

//  async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const session = await getSession({ req });
//       const { followerId, followingId } = req.body;

//       if (!session) {
//         return res.status(401).send({ message: "signin required" });
//       }

//       const following = await prisma.follows.create({
//         data: {
//           followerId,
//           followingId,
//         },
//       });
//       return res.status(200).send({ message: "success", following });
//     } catch (err) {
//       return res.status(400).send(console.log(err));
//     }
//   }
// };

// export default handler

import { prisma } from "../../utils/db";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, followingId } = req.body;

      // const session = await getSession({ req });

      // if (!session) {
      //   return res.status(401).send({ message: "signin required" });
      // }

      const follow = await prisma.user.update({
        where: {
          userId: id,
        },
        data: {
          following: {
            connect: {
              userId: followingId,
            },
            // create: {
            //   data: {
            //     userId: followingId,
            //   },
            // },
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
