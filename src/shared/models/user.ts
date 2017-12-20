export class User {
  name: string;
  tenets: Array<Tenant>;
}

export class Tenant {
  name: string;
  isActive: boolean;
  claims: Array<Claim>;
}

export class Claim {
  name: string;
  value: string;
}
