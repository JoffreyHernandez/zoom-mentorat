import { Recurrence } from './recurrence.interface';
import { Settings } from './settings.interface';

export interface CreateMeeting {
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  schedule_for: string;
  timezone: string;
  password: string;
  agenda: string;
  recurrence: Recurrence;
  settings: Settings;
}

