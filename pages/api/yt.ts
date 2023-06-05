
import { IVideoData } from '../../utils/index'
import { Client } from "youtubei";



export default async (req, res) => {

  if (req.method === "GET") {
    const youtube = new Client();

    const { song } = req.query;

    const results = await youtube.search(`${song} karaoke`, { type: "video" })

    if (!!results.items.length) {
      const resultsConformed: IVideoData[] = results.items.map((vid) => {
        console.log(vid)
        const { duration, id, title, channel } = vid
        return { artist: channel?.name || 'no artist info', duration: duration || 0, id, original_title: title, publishedAt: '', title }
      })
      return res.status(200).json(resultsConformed);
    }
    return res.status(403).json({ message: "Bad request" })
  }
};
