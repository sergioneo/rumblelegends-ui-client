import { Injectable } from '@angular/core';
import { AppsModel } from '../../models/';

import * as Web3 from 'web3';
declare let window: any;

@Injectable()
export class ContractsProviders {
  private _account: string = null;
  private _web3: any;
  public _tokenContract: any;
  public _tokenContract2: any;

  constructor(private appsModel: AppsModel) {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);
      if (this._web3.version.network !== '4') {
        console.log('Please connect to the Rinkeby network');
      }
    } else {
      console.warn('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }

    this._tokenContract = this._web3.eth.contract(this.appsModel.abi).at(this.appsModel.address);
    this._tokenContract2 = this._web3.eth.contract(this.appsModel.abi).at(this.appsModel.address2);
  }

  public async getUserBalance(tokenContract): Promise<any> {
    await this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      tokenContract.checkMyBalance.call((err, result) => {
        if (err != null) {
          reject(err);
        }

        resolve(_web3.fromWei(result));
      });
    }) as Promise<number>;
  }

  public async claim(tokenContract): Promise<any> {
    await this.getAccount();
    return (await new Promise((resolve, reject) => {
      tokenContract.claim((err, result) => {
        if (err != null) {
          reject(err);
        }

        resolve(result);
      });
    })) as Promise<number>;
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = (await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            console.log('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
          }

          resolve(accs[0]);
        });
      })) as string;

      this._web3.eth.defaultAccount = this._account;
    }

    return Promise.resolve(this._account);
  }
}
