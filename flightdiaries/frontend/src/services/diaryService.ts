import axios from 'axios';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(response => response.data)
}

const create = (object: NewDiaryEntry) => {
  return axios
    .post<NonSensitiveDiaryEntry>(baseUrl, object)
    .then(response => response.data)
    .catch(error => {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error[0].message)
      }
      throw error
    })
}

export default { getAll, create }