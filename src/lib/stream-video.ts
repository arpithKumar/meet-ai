import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!;
const secret = process.env.STREAM_CIDEO_SECRET_KEY!;

export const streamVideoClient = new StreamClient(apiKey, secret);
