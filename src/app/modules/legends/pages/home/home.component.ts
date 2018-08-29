// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { ContractsProviders, IndicatorsProvider } from '../../providers';

@Component({
	selector: 'home-component',
	styleUrls: ['./home.component.scss'],
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	activeContract: string = '';
	private contract: any = { balanceEther: '', balanceCLP: '' };
	private contract2: any = { balanceEther: '', balanceCLP: '' };
	private sumContacts: any = { balanceEther: '', balanceCLP: '' };

	constructor(private contractsProviders: ContractsProviders, private indicatorsProvider: IndicatorsProvider) {}
	public ngOnInit() {
		Promise.all([
			this.contractsProviders.getUserBalance(this.contractsProviders._tokenContract),
			this.contractsProviders.getUserBalance(this.contractsProviders._tokenContract2),
		]).then((value) => {
			this.contract.balanceEther = value[0].toNumber().toFixed(4);
			this.contract2.balanceEther = value[1].toNumber().toFixed(4);
			this.sumContacts.balanceEther = (value[0].toNumber() + value[1].toNumber()).toFixed(4);

			this.indicatorsProvider.getIndicatorsEtherCLP().subscribe(
				(data) => {
					const balanceOne = data.data.quotes.CLP.price * value[0].toNumber();
					const balanceTwo = data.data.quotes.CLP.price * value[1].toNumber();
					this.contract.balanceCLP = balanceOne.toFixed(0);
					this.contract2.balanceCLP = balanceTwo.toFixed(0);
					this.sumContacts.balanceCLP = (balanceOne + balanceTwo).toFixed(0);
				},
				(err) => {
					console.log('ha ocurrido un error', err);
				}
			);
		});
	}

	claim(type: number) {
		if (type === 1) {
			this.contractsProviders
				.claim(this.contractsProviders._tokenContract)
				.then((data) => window.open(`https://etherscan.io/tx/${data}`, '_blank'));
		} else {
			this.contractsProviders
				.claim(this.contractsProviders._tokenContract2)
				.then((data) => window.open(`https://etherscan.io/tx/${data}`, '_blank'));
		}
	}
}
