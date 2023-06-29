import React, { useEffect, useState } from "react";
import { Veriff } from "@veriff/js-sdk";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import axios from "axios";
import CryptoJS from "crypto-js";

export const VeriffPage = () => {
  const signMessage = (message, key) => {
    return CryptoJS.HmacSHA256(message, key);
  };
  const [sessionId, setSessionId] = useState(null);
  const generateClaim = () => {
    console.log("claim generation started-------------");
  };
  useEffect(() => {
    let interval;
    if (sessionId) {
      interval = window.setInterval(async () => {
        try {
          const response = await axios.get(
            `https://stationapi.veriff.com/v1/sessions/${sessionId}/decision`,
            {
              headers: {
                "X-AUTH-CLIENT": "f084cf46-a954-4da1-b908-db35d5e52bf7",
                "Content-Type": "application/json",
                "X-HMAC-SIGNATURE": signMessage(
                  sessionId,
                  "4cd80d09-4e5e-4253-885b-c7ec0a0535ce"
                ),
              },
            }
          );
          if (response.data.verification) {
            window.clearInterval(interval);
            generateClaim();
          }
        } catch (error) {
          console.log(error);
          window.clearInterval(interval);
        }
      }, 60 * 1000);
    }
    return () => window.clearInterval(interval);
  }, [sessionId]);
  useEffect(() => {
    const veriff = Veriff({
      host: "https://stationapi.veriff.com",
      apiKey: "f084cf46-a954-4da1-b908-db35d5e52bf7",
      parentId: "veriff-root",
      onSession: function (err, response) {
        console.log(response);
        if (response.status === "success") {
          createVeriffFrame({
            url: response.verification.url,
            onEvent: (msg) => {
              console.log(msg);
              if (msg === MESSAGES.FINISHED) {
                setSessionId(response.verification.id);
              }
            },
          });
        }
      },
    });
    veriff.mount();
  }, []);
  return <section id="veriff-root"></section>;
};
