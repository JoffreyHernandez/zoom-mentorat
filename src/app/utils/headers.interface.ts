import { HttpHeaders } from '@angular/common/http';

export const getHeaders = () => {
  return new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    .set('Access-Control-Allow-Origin', '*');
}
