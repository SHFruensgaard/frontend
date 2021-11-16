import { Component, OnInit } from '@angular/core';
import { Share } from "../../../generated/api/models/share";
import { ApiService } from "../../../generated/api/services/api.service";
import { EastereggService } from "../../environments/xyz/easteregg.service";

@Component({
    selector: 'app-shares',
    templateUrl: './shares.component.html',
    styleUrls: ['./shares.component.scss']
})
export class SharesComponent implements OnInit {
    public displayColumns: string[] = ['name', 'currentPrice', 'actions'];
    public shares: Share[] | undefined;
    public error?: string;

    constructor(private apiService: ApiService, private eastereggService: EastereggService) {
    }

    ngOnInit() {
        this.updateShares();
        setInterval(() => this.updateShares(), 15000)
    }

    buyShare(shareId: string) {
        this.apiService.investmentShareBuyPost({'body': shareId}).toPromise()
            .catch(error => window.alert(error.message));
        if (this.shares) {
            this.eastereggService.y(shareId, this.shares.map(x => Object.assign({}, x)))
        }
        this.updateShares();
    }

    updateShares() {
        this.apiService.investmentShareGet().toPromise()
            .then((shares: Share[]) => {
                this.shares = shares
                this.error = undefined;
            }).catch((error) => {
                this.shares = undefined;
                this.error = error.message;
            }
        );
    }
}
