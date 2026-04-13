import { type Plugin } from "@elizaos/core";
export declare const transactionLog: Array<{
    timestamp: Date;
    type: string;
    from: string;
    to: string;
    amount: number;
    signature: string;
    status: string;
}>;
export declare const solanaPaymentPlugin: Plugin;
export default solanaPaymentPlugin;
