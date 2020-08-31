import { Meeting } from './meeting.interface';

export interface Meetings {
  meetings: Meeting[];
  next_page_token?: string;
  page_count: number;
  page_size: number;
  total_records: number;
}
