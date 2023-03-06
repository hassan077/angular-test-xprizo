import { AUTO_STYLE } from "@angular/animations";

export class AuthModel {
  id: number;
  userName: string;
  name: string;
  role: string;
  isSubAgent: string;
  token: string;
  expires: Date;
  language: string;

  setAuth(auth: AuthModel) {
    this.id = auth.id;
    this.userName = auth.userName;
    this.name = auth.name;
    this.role = auth.role;
    this.isSubAgent = auth.isSubAgent;
    this.token = auth.token;
    this.expires = auth.expires;
    this.language = auth.language;
  }
}
