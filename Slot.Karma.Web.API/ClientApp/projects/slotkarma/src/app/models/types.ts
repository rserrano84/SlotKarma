import { MenuItem } from 'primeng/api';

//@dynamic
export class Types { 
  public static genders = [{ id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }, { id: 'O', name: 'Other' }];
  public static genderMap: Map<String, String> = new Map(Types.genders.map(i => [i.id, i.name])); 
  public static winTypes =[{id: 1, name: 'Hand Pay'}, {id: 2, name: 'Win'}, {id: 3, name: 'Loss'}, {id: 4, name: 'Jackpot'}]
  public static searchMenuItems : Array<MenuItem> = [
    { id: 'single-payouts', label: '10 Highest Single Payouts', queryParams: {skip: 0, take:10, orderby: '', dir: '', type: 'single'}},
    { id: 'most-played-machines', label: '10 Most Played Machines', queryParams: {skip: 0, take:10, orderby: '', dir: '', type: 'most'} },
    { id: 'least-played-machines', label: '10 Least Played Machines', queryParams: {skip: 0, take:10, orderby: '', dir: '', type: 'least'} },
    { id: 'highest-payout', label: '10 Machines with the Highest Payouts', queryParams: {skip: 0, take:10, orderby: '', dir: '', type: 'highest'} }, 
    { id: 'lowest-payout', label: '10 Machines with the Lowest Payouts', queryParams: {skip: 0, take:10, orderby: '', dir: '', type: 'lowest'} } 
  ]
}