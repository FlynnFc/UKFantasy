import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { ourFileRouter } from "../../server/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
  // config: {
  //   uploadthingId: process.env.UPLOADTHING_APP_ID,
  //   uploadthingSecret: process.env.UPLOADTHING_SECRET,
  // },
});

export default handler;
