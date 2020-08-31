export interface Meeting {
  uuid: string;
  id: any;
  host_id: string;
  topic: string;
  type: number;
  start_time: Date;
  duration: number;
  timezone: string;
  created_at: Date;
  join_url: string;
}
