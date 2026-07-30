import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/displayAccounts.getAccounts';

export default class DisplayAccounts extends LightningElement {
    accounts = [];
    error;
    columns = [
        {
            label : 'Name',
            fieldName : 'Name',
            type : 'text'
        },
        {
            label : 'Industry',
            fieldName : 'Industry',
            type : 'text'
        },
        {
            label : 'Annual Revenue',
            fieldName : 'AnnualRevenue',
            type : 'currency'
        }
    ]

    @wire(getAccounts)
    wiredAccounts({data,error}){
        if(data){
            this.accounts = data;
            this.error = undefined;
        } else if (error){
            this.accounts = undefined;
            this.error = error.body.message;
        }
    }
}
