export type Club = {
  id: number;
  name: string;
  active: boolean;
  date_added: string;
  mobile_number: string;
  address: string;
};

export type Organization = {
  id: number;
  name: string;
  telephone_number: string;
  website: string;
  country: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  mobile: string;
  mobile_country: string;
  org_country: string;
  address: string;
  vat_registration: string;
  trn_number: string;
  logo_url: string;
  commercial_license_url: string;
  license_expiry_date: string;
  commercial_license_type: string;
  trn_image_url: string;
  trn_image_type: string;
  clubs: Club[];
};

export type OrganizationResponse = {
  data: Organization;
  message: string;
};
