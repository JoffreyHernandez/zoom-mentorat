import { CreateMeeting } from '../interfaces/createMeeting.interface';

export const createMeetingBuilder =
  (fullName: string, date: Date): CreateMeeting => {
    return {
      topic: `Soutenance ${fullName}`,
      type: 2,
      start_time: date.toString(),
      duration: 60,
      schedule_for: null,
      timezone: 'Europe/Paris',
      password: 'Op3ncl4$$',
      agenda: 'description',
      recurrence: null,
      settings: {
        host_video: true,
        participant_video: false,
        cn_meeting: false,
        in_meeting: false,
        join_before_host: false,
        mute_upon_entry: false,
        watermark: false,
        use_pmi: false,
        approval_type: 2,
        registration_type: null,
        audio: 'voip',
        auto_recording: 'local',
        enforce_login: false,
        enforce_login_domains: null,
        alternative_hosts: null,
        global_dial_in_countries: null,
        registrants_email_notification: null,
      },
    };
  };
