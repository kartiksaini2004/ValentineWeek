export interface ValentineDay {
  date: string;
  day: number;
  name: string;
  description: string;
  theme: {
    gradient: string;
    icon: string;
  };
  message: string;
}

export interface ValentineState {
  id: string;
  has_accepted: boolean;
  days_visited: number[];
  created_at: string;
  updated_at: string;
}
