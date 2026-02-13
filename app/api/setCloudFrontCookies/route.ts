import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { NextResponse } from "next/server";
export async function GET() {
  // ESM
  // const { getSignedCookies } = require("@aws-sdk/cloudfront-signer"); // CJS
  try {
    const cloudfrontDistributionDomain =
      "https://d12uqqfq0d2m6q.cloudfront.net";
    const s3ObjectKey = "*";
    const url = `${cloudfrontDistributionDomain}/${s3ObjectKey}`;
    const privateKey = Buffer.from(
      process.env.PRIVATE_KEY_BASE64!,
      "base64",
    ).toString("utf-8");
    const keyPairId = process.env.KEY_PAIR_ID!;
    const dateLessThan = "2026-02-16";

    const policy = {
      Statement: [
        {
          Resource: url,
          Condition: {
            DateLessThan: {
              "AWS:EpochTime": new Date(dateLessThan).getTime() / 1000, // time in seconds
            },
          },
        },
      ],
    };
    const policyString = JSON.stringify(policy);

    const signedUrl = getSignedUrl({
      keyPairId,
      privateKey,
      policy: policyString,
      url: cloudfrontDistributionDomain,
    });

    return NextResponse.json({ url: signedUrl }, { status: 200 });

    // for signed cookies in prod after getting a domain
    //  const rawCookies = getSignedUrl({
    //    keyPairId,
    //    privateKey,
    //    policy: policyString,
    //  });

    // const cookieStore = await cookies();
    // const cookieOptions = {
    //   httpOnly: true,
    // };
    // cookieStore.set({
    //   name: "CloudFront-Key-Pair-Id",
    //   value: rawCookies["CloudFront-Key-Pair-Id"],
    //   ...cookieOptions,
    // });
    // cookieStore.set({
    //   name: "CloudFront-Expires",
    //   value: String(rawCookies["CloudFront-Expires"]!),
    //   ...cookieOptions,
    // });
    // cookieStore.set({
    //   name: "CloudFront-Signature",
    //   value: rawCookies["CloudFront-Signature"],
    //   ...cookieOptions,
    // });
    // cookieStore.set({
    //   name: "CloudFront-Policy",
    //   value: rawCookies["CloudFront-Policy"]!,
    //   ...cookieOptions,
    // });
    // return NextResponse.json(
    //   { msg: "cookies set successfully" },
    //   { status: 200 },
    // );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ msg: "unsuccessful" }, { status: 403 });
    }
  }
}
