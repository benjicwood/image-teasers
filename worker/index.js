export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/image") {
      const image = await env.IMAGES.get("test.jpg");

      if (!image) {
        return new Response("Image not found", { status: 404 });
      }

      return new Response(image.body, {
        headers: {
          "Content-Type": image.httpMetadata?.contentType || "image/jpeg",
          "Cache-Control": "no-store",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};