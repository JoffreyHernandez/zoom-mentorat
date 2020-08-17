export interface OAuth {
  access_token: string;
  date?: Date;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
