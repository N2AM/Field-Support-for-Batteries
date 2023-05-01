import axios from 'axios';
import { API_URL } from '../constants/constants';


export const BatteryService = {
    async getData() {
        const response = await axios.get(API_URL);
        return response.data;
    }
}