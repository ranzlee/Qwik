export class User {
  name: string;
  tenets: Array<Tenet>;
}

export class Tenet {
  name: string;
  isActive: boolean;
  claims: Array<Claim>;
}

export class Claim {
  name: string;
  value: string;
}
