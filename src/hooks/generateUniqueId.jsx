
import { v4 as uuid } from 'uuid';

export const generateUniqueId = () => {
    const unique_id = uuid();
    return unique_id;
}