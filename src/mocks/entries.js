import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid'


const entries = [
    { id: 1, timestamp: dayjs('2021-04-28'), text: 'I ate at Tucanos, they were super slow, Krish got angry', tags: ['food'] },
    { id: 2, timestamp: dayjs('2021-05-07'), text: 'I taught another training today', tags: ['story', 'opportunity'] }
];


export const getEntries = (limit = 10, firstId) => {
    let firstElementIndex = 0;
    if (firstId) {
        firstElementIndex = entries.findIndex(({ id }) => id === firstId)
        if (firstElementIndex === -1) {
            return [];
        }
    }

    return entries.slice(firstElementIndex, firstElementIndex + limit);

}

export const addEntry = (text, tags, date) => {
    entries.push({ id: uuid(), text, tags, timestamp: date ? dayjs(date).startOf('day') : dayjs().toISOString() });

    console.log('entries after add', entries);
}
