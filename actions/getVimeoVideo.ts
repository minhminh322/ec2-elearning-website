export const getVimeoVideo = async (playbackId: string | null) => {
  const res = await fetch(`${process.env.VIMEO_API_URL}/videos/${playbackId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      accept: "application/vnd.vimeo.*+json;version=3.4",
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};
