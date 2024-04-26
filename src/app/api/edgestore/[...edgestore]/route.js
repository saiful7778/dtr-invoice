import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { z } from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  dtrInoiceImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 5,
      accept: ["image/jpeg", "image/jpg", "image/png"],
    })
    .input(
      z.object({
        type: z.enum(["product"]),
      }),
    )
    .path(({ input }) => [{ type: input.type }])
    .beforeDelete(() => {
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
