export const getVideoDataById = async (id: string, fetchHandler = fetch) => {
  const response = await fetchHandler(`/video/${id}`)
  const data = await response.json();

  return data as BunnyVideo;
}