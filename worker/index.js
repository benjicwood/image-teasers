const schedule = [
  { date: "2026-11-24T09:00:00Z", image: "image-1.jpg" },
  { date: "2026-11-24T11:00:00Z", image: "image-2.jpg" },
  { date: "2026-11-24T13:00:00Z", image: "image-3.jpg" },
  { date: "2026-11-24T15:00:00Z", image: "image-4.jpg" },
  { date: "2026-11-24T17:00:00Z", image: "image-5.jpg" },
  { date: "2026-11-24T19:00:00Z", image: "image-6.jpg" },
  { date: "2026-11-25T09:00:00Z", image: "image-7.jpg" },
  { date: "2026-11-25T11:00:00Z", image: "image-8.jpg" },
  { date: "2026-11-25T13:00:00Z", image: "image-9.jpg" },
  { date: "2026-11-25T15:00:00Z", image: "image-10.jpg" },
  { date: "2026-11-25T17:00:00Z", image: "image-11.jpg" },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/image") {
      const now = Date.now();

      const current = schedule
        .filter((item) => Date.parse(item.date) <= now)
        .at(-1);

      if (!current) {
        return new Response("No image available yet", {
          status: 404,
          headers: { "Cache-Control": "no-store" },
        });
      }

      const image = await env.IMAGES.get(current.image);

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