import {reduce, pick} from 'lodash';
import { Bar } from './interfaces/bars';
import { DBUtils } from './utils/database.utils';

export class BarsService {

    private db: DBUtils;

    constructor() {
        this.db = new DBUtils();
    }
    
    async getBars(): Promise<Bar[ ]> {
        return this.convertDBObjects(await this.db.queryDB('SELECT * FROM bars', undefined));   
    }

    convertDBObjects(bars: any): Bar [] {
        return reduce(bars, (accumulator: Bar [], bar: any) => {
            accumulator.push(pick(bar, ['bar_id', 'bar_name']));
            return accumulator;
        }, [])
    }
}