export const sendMail = (dest: string, roomId: string) => {
  const url = new URL(
    'https://us-central1-react-webrtc-8c322.cloudfunctions.net/sendMail',
  );
  url.searchParams.append('dest', dest);
  url.searchParams.append('roomId', roomId);
  return fetch(url.href);
};
