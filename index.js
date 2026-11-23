export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/image") {
      return new Response("Image endpoint working!");
    }

    return env.ASSETS.fetch(request);
  },
};