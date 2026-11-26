const schedule = [
  { date: "2026-11-26T00:00:00Z", image: "test-image-1.png" },
  { date: "2026-11-27T12:00:00Z", image: "test-image-2.png" },
  { date: "2026-11-27T20:00:00Z", image: "test-image-3.png" },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const now = Date.now();

    const current = schedule
      .filter((item) => Date.parse(item.date) <= now)
      .at(-1);

    const next = schedule.find((item) => Date.parse(item.date) > now);

    if (url.pathname === "/api/status") {
      return Response.json(
        {
          currentRelease: current?.date || null,
          nextRelease: next?.date || null,
          serverTime: now,
        },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    if (url.pathname === "/api/image") {
      if (!current) {
        return new Response("No image available yet", {
          status: 404,
          headers: { "Cache-Control": "no-store" },
        });
      }

      const image = await env.IMAGES.get(current.image);

      if (!image) {
        return new Response("Image not found", {
          status: 404,
          headers: { "Cache-Control": "no-store" },
        });
      }

      return new Response(image.body, {
        headers: {
          "Content-Type": image.httpMetadata?.contentType || "image/png",
          "Cache-Control": "no-store",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
