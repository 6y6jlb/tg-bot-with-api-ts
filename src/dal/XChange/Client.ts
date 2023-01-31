import fetch from 'node-fetch';
import config from "../../utils/config";
import { SERVICE_ROUTES } from "../../utils/const";
import Client from "../absctract/Client";
import { IOpeneXChangeRatesLatest, IOpeneXChangeRatesLatestGet } from './types';

class XChangeClient extends Client {
    async get(params?: IOpeneXChangeRatesLatestGet): Promise<IOpeneXChangeRatesLatest> {
        const url = new URL(SERVICE_ROUTES.OPEN_XHANGE_RATE.BASE + SERVICE_ROUTES.OPEN_XHANGE_RATE.LATEST);


        url.searchParams.append('app_id', config.XCHANGE_API_KEY);
        url.searchParams.append('base', params?.base || 'USD');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                cache: 'no-cache',
                credentials: 'same-origin',
                'Content-Type': 'application/json'
            },
        });
        await this.throwOnError(response);
        const data = await response.json();

        return data;
    }

}

export default new XChangeClient();