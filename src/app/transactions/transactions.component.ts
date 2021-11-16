import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from "../../../generated/api/models/account";
import { Transaction } from "../../../generated/api/models/transaction";
import { ApiService } from "../../../generated/api/services/api.service";

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    public account!: Account;
    public transactions!: Transaction[];
    public displayedColumns = ['description', 'amount', 'date', 'category'];

    constructor(private apiService: ApiService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.updateTransactions();
    }

    private updateTransactions() {
        this.route.paramMap.subscribe(params => {
            const accountId = params.get('accountId');
            if (accountId) {
                this.apiService.accountAccountIdGet({accountId}).toPromise().then(
                    (account: Account) => {
                        this.account = account;
                        this.apiService.transactionAccountIdGet({accountId}).toPromise().then(
                            (transactions: Transaction[]) => this.transactions = transactions
                        );
                    }
                );
            }
        });
    }


    toTopFunction() {
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

}
