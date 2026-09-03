import os from "os";

export const mediasoupConfig = {
  // Worker settings (2 workers for fast startup and multi-core load distribution)
  numWorkers: 2,
  worker: {
    rtcMinPort: 20000,
    rtcMaxPort: 29999,
    logLevel: "warn",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp"]
  },
  // Router settings
  router: {
    mediaCodecs: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000,
        parameters: {
          "x-google-start-bitrate": 1000
        }
      },
      {
        kind: "video",
        mimeType: "video/H264",
        clockRate: 90000,
        parameters: {
          "packetization-mode": 1,
          "profile-level-id": "42e01f",
          "level-asymmetry-allowed": 1
        }
      }
    ]
  },
  // WebRtcTransport settings
  webRtcTransport: {
    listenIps: [
      {
        ip: "0.0.0.0",
        announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP || "127.0.0.1"
      }
    ],
    initialAvailableOutgoingBitrate: 1000000,
    maxSctpMessageSize: 262144,
    enableUdp: true,
    enableTcp: true,
    preferUdp: true
  }
};
