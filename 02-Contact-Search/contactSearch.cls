public with sharing class ContactSearchController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchText){

        return [
            SELECT Id, FirstName, LastName, Email
            FROM Contact
            WHERE Name LIKE :('%' + searchText + '%')
            ORDER BY Name
            LIMIT 20
        ];
    }
}
