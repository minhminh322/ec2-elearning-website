export interface VideoMeta {
  id: string;
  title: string;
  description: string;
  link: string;
  thumbnailUrl: string;
  duration: number; // in seconds
}

export const getVimeoVideo = async (playbackId: string) => {
  try {
    if (!playbackId) {
      return null;
    }
    const res = await fetch(
      `${process.env.VIMEO_API_URL}/videos/${playbackId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
          accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data: VideoMeta = await res.json();
    return data;
  } catch (error) {
    console.log("[GET_VIMEO_VIDEO]", error);
    return null;
  }
};
