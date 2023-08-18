import type { NextApiRequest, NextApiResponse } from "next";

async function getAccessToken() {
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      client_secret: process.env.TWITCH_CLIENT_SECRET!,
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) {
    console.error("error", res);
  } else {
    const data = await res.json();
    return await data.access_token;
  }
}
async function getStreams() {
  const streamers: string[] = [
    "edeninho_",
    "meffew",
    "esl_csgo",
    "shoobieTV",
    "pieface_CS",
    "gizmyy",
    "esl_csgo",
    "esl_csgo_nc",
    "dweg",
    "daemonicinferno",
    "penguin5",
    "nazzery_",
    "godkucs",
    "ghilcs",
    "lorthehero",
    "jackyesports",
    "kica_cs",
    "k10_tree",
    "otyl3r",
    "daemonicinferno",
    "epiclan1",
    "ourob_",
    "vildacs",
    "igorekcs2",
    "themythicaloriginal",
    "mms_cs",
    "EU_ReTr00",
    "alcan1",
  ];
  const token = await getAccessToken();
  let path = "https://api.twitch.tv/helix/streams?";
  for (let i = 0; i < streamers.length; i++) {
    const element = streamers[i];
    if (i !== streamers.length - 1) {
      path += `user_login=${element}&`;
    } else {
      path += `user_login=${element}`;
    }
  }
  const res = await fetch(`${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": "6fxkh5rfgrch8392kb8p2kfhu6q1qp",
    },
  });
  if (!res.ok) {
    console.error("error", res);
    return;
  } else {
    const data = res.json();
    return data;
  }
}

const twitchstreams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const streams = await getStreams();
        res.status(200).json(streams);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching Admins" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default twitchstreams;
