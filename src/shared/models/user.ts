export class User {
  name: string;
  tenants: Array<Tenant>;
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
