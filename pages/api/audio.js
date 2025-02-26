import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const videoId = req.query.id;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing video ID' });
  }

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(url);
    
    const format = ytdl.chooseFormat(info.formats, {
      filter: 'audioonly',
      quality: 'highestaudio'
    });

    if (!format) {
      return res.status(404).json({ error: 'No audio format found' });
    }

    res.setHeader('Content-Type', format.mimeType.split(';')[0]);
    res.setHeader('Content-Disposition', `inline; filename="${info.videoDetails.title}.${format.container}"`);

    ytdl(url, { format: format })
      .on('error', error => {
        console.error('YTDL Error:', error);
        res.status(500).end();
      })
      .pipe(res);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}