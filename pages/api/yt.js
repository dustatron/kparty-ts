// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const usetube = require("usetube");

export default async (req, res) => {
  if (req.method === "GET") {
    const { song } = req.query;
    const getYT = async () => {
      const result = await usetube.searchVideo(`${song} karaoke`);
      return await result;
    };
    const result = await getYT();

    res.status(200).json(result);
  }
};
