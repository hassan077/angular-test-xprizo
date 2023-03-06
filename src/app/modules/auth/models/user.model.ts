import { AuthModel } from './auth.model';
import { ContactModel } from './contact.model';
import { PreferenceModel } from './preference.model';
import { WalletModel } from './wallet.model';

export class UserModel extends AuthModel {
  
    "id": 0;
    "hashId": "string";
    "name": "string";
    "role": "string";
    "isInactive": true;
    "isSuspended": true;
    "isAgent": true;
    "lastLogin": "2023-03-05T15:09:24.722Z";
    "registeredOn": "2023-03-05T15:09:24.722Z";
    "recruitedOn": "2023-03-05T15:09:24.722Z";
    "contact": ContactModel;
    "preference": PreferenceModel;
    "userWallets": WalletModel[];
    "savingWallets": WalletModel[];;
    "agentWallets": WalletModel[];;
    "linkedWallets": [
      {
        "id": 0;
        "hashId": "string";
        "name": "string";
        "access": "string";
        "wallets": WalletModel[];
      }
    ]
  
}
