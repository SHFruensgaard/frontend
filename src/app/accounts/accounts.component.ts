import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from "../../../generated/api/models/account";
import { ApiService } from "../../../generated/api/services/api.service";

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
    public displayColumns = ['number', 'name', 'balance'];
    public accounts?: Account[];
    public error: string | undefined;

    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit() {
        this.updateAccounts();
        setInterval(() => this.updateAccounts(), 1000);
    }

    updateAccounts() {
        this.apiService.accountGet().toPromise()
            .then((accounts: Account[]) => {
                this.error = undefined;
                this.accounts = accounts;
            }).catch(error => {
                this.error = error.message;
                this.accounts = undefined;
        });
    }

    goToAccountTransactions(accountId: string) {
        this.router.navigate(['/transactions', accountId]);
    }

}
