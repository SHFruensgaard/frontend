import { Component, OnInit } from '@angular/core';
import { OwnedShare } from "../../../generated/api/models/owned-share";
import { ApiService } from "../../../generated/api/services/api.service";

@Component({
    selector: 'app-owned-shares',
    templateUrl: './owned-shares.component.html',
    styleUrls: ['./owned-shares.component.scss']
})
export class OwnedSharesComponent implements OnInit {
    public displayColumns: string[] = ['name', 'buyPrice', 'sellPrice', 'buyDate', 'actions'];
    public ownedShares?: OwnedShare[];
    public error: string | undefined;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.updateOwnedShares();
        setInterval(() => this.updateOwnedShares(), 1000)
    }

    updateOwnedShares() {
        this.apiService.investmentShareOwnedGet().toPromise()
            .then((ownedShares: OwnedShare[]) => {
                this.ownedShares = ownedShares;
                this.error = undefined;
            })
            .catch(error => {
                this.ownedShares = undefined;
                this.error = error.message;
            });
    }

    sellShare(ownedShareId: string) {
        this.apiService.investmentShareSellPost({'body': ownedShareId}).toPromise()
            .catch(error => window.alert(error.message));
        this.updateOwnedShares();
    }
}
