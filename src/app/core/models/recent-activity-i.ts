export interface RecentActivityI {
  id: string;
  taskTitle: string;
  action: 'created' | 'updated' | 'completed';
  timestamp: string;
}
