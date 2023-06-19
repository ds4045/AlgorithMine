import { nanoid } from 'nanoid';
import { getCurrentDate } from '../helpers/getCurrentDate';
import { LeadType, QuizType } from '../types/types';
import { addDataForDB } from './firebaseAPI';

export const addLeadToDB: any = async (
  phone: string,
  email: string,
  name: string,
  quiz?: QuizType,
) => {
  const newLead: LeadType = {
    id: nanoid(),
    date: getCurrentDate(),
    phone,
    email,
    name,
    quiz: quiz ? quiz : {},
  };
  await addDataForDB('leads', newLead);
};
