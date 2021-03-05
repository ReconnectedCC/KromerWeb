// Copyright (c) 2020-2021 Drew Lemmy
// This file is part of KristWeb 2 under GPL-3.0.
// Full details: https://github.com/tmpim/KristWeb2/blob/master/LICENSE.txt
import React from "react";

import Debug from "debug";
const debug = Debug("kristweb:backup-results");

export type MessageSource = "wallets" | "friends";
export type MessageType = React.ReactNode | string;
export type ResultType = "success" | "warning" | "error";

export class BackupResults {
  /** Number of new wallets that were added as a result of this import. */
  private newWallets = 0;

  /** Number of wallets from the backup that were skipped (not imported). */
  private skippedWallets = 0;

  /** For both wallets and friends, a map of wallet/friend UUIDs containing
   * all the messages (success, warning, error). */
  private messages: {
    wallets: Record<string, BackupMessage[]>;
    friends: Record<string, BackupMessage[]>;
  } = {
    wallets: {},
    friends: {}
  };

  /** Adds a message to the appropriate message map. */
  private addMessage(src: MessageSource, uuid: string, message: BackupMessage): void {
    debug("backup result msg [%s] for %s: %o", src, uuid, message);

    const msgMap = this.messages[src];
    if (!msgMap[uuid]) msgMap[uuid] = [message];
    else msgMap[uuid].push(message);
  }

  /** Logs a success message for the given wallet/friend UUID to the appropriate
   * message map. */
  public addSuccessMessage(src: MessageSource, uuid: string, message: MessageType): void {
    this.addMessage(src, uuid, { type: "success", message });
  }

  /** Logs a warning message for the given wallet/friend UUID to the appropriate
   * message map. */
  public addWarningMessage(src: MessageSource, uuid: string, message: MessageType): void {
    this.addMessage(src, uuid, { type: "warning", message });
  }

  /** Logs an error message for the given wallet/friend UUID to the appropriate
   * message map. */
  public addErrorMessage(src: MessageSource, uuid: string, message: MessageType, error?: Error): void {
    this.addMessage(src, uuid, { type: "error", message, error });
  }

  /** Increments the new wallets counter. */
  public incrNewWallets(): void {
    this.newWallets++;
  }

  /** Increments the skipped wallets counter. */
  public incrSkippedWallets(): void {
    this.skippedWallets++;
  }
}

export interface BackupMessage {
  type: ResultType;
  error?: Error;
  message: MessageType;
}

export class BackupError extends Error {
  constructor(message: string) { super(message); }
}
