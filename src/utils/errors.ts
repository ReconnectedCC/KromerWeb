// Copyright (c) 2020-2021 Drew Lemmy
// This file is part of KristWeb 2 under AGPL-3.0.
// Full details: https://github.com/tmpim/KristWeb2/blob/master/LICENSE.txt
import * as Sentry from "@sentry/react";
import { CaptureContext } from "@sentry/types";
import { Integrations } from "@sentry/tracing";

import { message } from "antd";

declare const __GIT_VERSION__: string;
const gitVersion: string = __GIT_VERSION__;

const ls = localStorage.getItem("settings.errorReporting");
export const errorReporting = process.env.DISABLE_SENTRY !== "true" &&
  (ls === null || ls === "true");
export const messageOnErrorReport = localStorage.getItem("settings.messageOnErrorReport") === "true";

export function criticalError(
  err: Error | string,
  captureContext?: CaptureContext
): void {
  Sentry.captureException(err, captureContext);
  console.error("Critical error: ", err);
}
