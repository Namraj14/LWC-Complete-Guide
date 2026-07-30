public with sharing class displayAccounts {

    @AuraEnabled(cacheable=true)
        public static List<Account> getAccounts(){
            return [Select Id,Name,Industry,AnnualRevenue FROM Account];
        }
    
}
