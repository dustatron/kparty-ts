
import { IVideoData } from '../../utils/index'
import { Client } from "youtubei";


const youtube = new Client();

export default async (req, res) => {

  if (req.method === "GET") {

    const { song } = req.query;

    const results = await youtube.search(`${song} karaoke`, { type: "video" })

    if (!!results.items.length) {

      const resultsConformed: IVideoData[] = results.items.map((vid) => {
        const { duration, id, title, channel } = vid
        return { artist: channel?.name || 'no artist info', duration: duration || 0, id, original_title: title, publishedAt: '', title }
      })

      res.status(200).json(resultsConformed);
    }

  }
};
