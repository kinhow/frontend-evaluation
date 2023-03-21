export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface UserLinks {
  url: null;
  label: string;
  active: boolean;
}

export interface UserResponse {
  current_page: number;
  data: UserData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: UserLinks[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
