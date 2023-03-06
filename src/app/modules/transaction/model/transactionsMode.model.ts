import { WalletModel } from "../../auth/models/wallet.model";
import { TransactionModel } from "./transaction.model";

export class TransactionsRespModel {
    "walletAccount": WalletModel;
    "transactions": TransactionModel[];
}