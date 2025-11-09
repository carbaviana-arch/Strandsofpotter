export interface Task {
  id: string;
  name: string;
  points: number;
  penalty: number;
  category: string;
  status: 'pending' | 'completed' | 'penalized';
}
