import axios from 'axios';
import { Surah } from './type';
interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

interface Recitation {
  id: number;
  reciter_name: string;
  style: string | null;
}

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



// Function to fetch surahs
export const fetchSurahsFromAlquran = async (setChapter: React.Dispatch<React.SetStateAction<Chapter[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await axios.get<{ chapters: Chapter[] }>('https://api.quran.com/api/v4/chapters');
    setChapter(response.data.chapters);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Error fetching surahs:', error);
  }
};
// Function to fetch recitations
export const fetchRecitations = async (setRecitations: React.Dispatch<React.SetStateAction<{ label: string; value: number; }[]>>) => {
  try {
    const response = await axios.get<{ recitations: Recitation[] }>('https://api.quran.com/api/v4/resources/recitations');
    const recitationsData = response.data.recitations;
    setRecitations(recitationsData.map(recitation => ({
      label: `${recitation.reciter_name}`,
      value: recitation.id
    })));
  } catch (error) {
    console.error('Error fetching recitations:', error);
  }
};

// get list of languages 
export const getTranslationLanguage=async ()=>{
  try {
    const response = await axios.get('https://api.alquran.cloud/v1/edition/type/translation');
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}