import axios from 'axios';
import { Surah } from './type';

export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await axios.get<{ data: Surah[] }>('http://api.alquran.cloud/v1/surah');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
};


export const fetchSurahById = async (id:number) => {
  try {
    const response = await axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Surah by ID:', error);
    throw error;
  }
};

export const fetchSurahAudioById = async (id:number) => {
  try {
    const response = await axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Surah audio by ID:', error);
    throw error;
  }
};



export const getReciter= async ()=>{
  try {
    const response = await axios.get(`https://api.quran.com/api/v4/resources/recitations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Surah audio by ID:', error);
    throw error;
  }
}


type audioProps={
  surahId:number
}
export const getAudio= async ({surahId}:audioProps)=>{
  try {
    const response = await axios.get(`https://api.quran.com/api/v4/chapter_recitations/1/${surahId}`);
    return response.data.audio_file;
  } catch (error) {
    console.error('Error fetching Surah audio by ID:', error);
    throw error;
  }
}

