import { ethereum, Entity, Value } from "@graphprotocol/graph-ts";

import { getChangeSequenceNumber } from "./Global";
import { getTransaction } from "./Transaction";
import { getCurrentSystemState } from "./SystemState";

export function beginChange(): number {
  return getChangeSequenceNumber();
}

export function initChange(change: Entity, event: ethereum.Event, sequenceNumber: number): void {
  let transactionId = getTransaction(event).id;
  let systemStateBeforeId = getCurrentSystemState().id;

  change.set("sequenceNumber", Value.fromI32(<i32>sequenceNumber));
  change.set("transaction", Value.fromString(transactionId));
  change.set("systemStateBefore", Value.fromString(systemStateBeforeId));
}

export function finishChange(change: Entity): void {
  let systemStateAfterId = getCurrentSystemState().id;

  change.set("systemStateAfter", Value.fromString(systemStateAfterId));
}
