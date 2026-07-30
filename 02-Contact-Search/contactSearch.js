import { LightningElement } from 'lwc';
import searchContacts from '@salesforce/apex/ContactSearchController.searchContacts';

export default class ContactSearch extends LightningElement {

    searchText = "";
    contacts = [];

    handleChange(event){
        this.searchText = event.target.value;
        
    }
    handleClick(){
        console.log('Searching for: ', this.searchText);
        
        searchContacts({searchText: this.searchText})
        .then(result=>{
            this.contacts=result;
        })
        .catch(error => {
        console.log('Full Error:', JSON.stringify(error));
        console.log('Error Object:', error);
    });
    }
    clearClick(){
        this.searchText = "";
        this.contacts = [];
    }
}
