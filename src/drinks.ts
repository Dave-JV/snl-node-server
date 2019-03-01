import {reduce, pick} from 'lodash';
import { DBUtils } from './utils/database.utils';
import { Drink } from './interfaces/drinks';

export class DrinksService {

    private db: DBUtils;

    constructor() {
        this.db = new DBUtils();
    }
    
    async getDrinks(): Promise<Drink []> {
        return this.convertDBObjects(await this.db.queryDB('SELECT * FROM drinks', undefined));   
    }
    async getBarDrinks(barId: number): Promise<Drink []> {
        return this.convertDBObjects(await this.db.queryDB('SELECT * FROM drinks WHERE bar_id = ?', [`${barId}`]));   
    }

    convertDBObjects(drinks: any): Drink [] {
        return reduce(drinks, (accumulator: Drink [], drink: any) => {
            accumulator.push(pick(drink, ['drink_name', 'drink_id', 'bar_id', 'price']));
            return accumulator;
        }, [])
    }
}