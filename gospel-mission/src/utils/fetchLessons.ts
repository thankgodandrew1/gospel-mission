import axios from 'axios';

export const fetchLessons = async () => {
  try {
    const response = await axios.get(
      'https://thankgodandrew1.github.io/lessons-json/lessons.json'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
};
