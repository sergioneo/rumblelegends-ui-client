export class AppsModel {
	private _abi: Array<Object> = [
		{
			constant: false,
			inputs: [],
			name: 'claim',
			outputs: [],
			payable: false,
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			payable: true,
			stateMutability: 'payable',
			type: 'fallback',
		},
		{
			inputs: [
				{
					name: '_payees',
					type: 'address[]',
				},
				{
					name: '_shares',
					type: 'uint256[]',
				},
			],
			payable: true,
			stateMutability: 'payable',
			type: 'constructor',
		},
		{
			constant: true,
			inputs: [],
			name: 'checkMyBalance',
			outputs: [
				{
					name: '',
					type: 'uint256',
				},
			],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
		{
			constant: true,
			inputs: [
				{
					name: '',
					type: 'uint256',
				},
			],
			name: 'payees',
			outputs: [
				{
					name: '',
					type: 'address',
				},
			],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
		{
			constant: true,
			inputs: [
				{
					name: '',
					type: 'address',
				},
			],
			name: 'released',
			outputs: [
				{
					name: '',
					type: 'uint256',
				},
			],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
		{
			constant: true,
			inputs: [
				{
					name: '',
					type: 'address',
				},
			],
			name: 'shares',
			outputs: [
				{
					name: '',
					type: 'uint256',
				},
			],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
		{
			constant: true,
			inputs: [],
			name: 'totalReleased',
			outputs: [
				{
					name: '',
					type: 'uint256',
				},
			],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
		{
			constant: true,
			inputs: [],
			name: 'totalShares',
			outputs: [
				{
					name: '',
					type: 'uint256',
				},
			],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
	];

	private _address: string = '0x96c35ce071cfdb641445f905386f1fd99d453de9';
	private _address2: string = '0x6186153850a5afc9384c33b565bdddcc70e6a5ae';

	//Get
	get abi() {
		return this._abi;
	}

	get address() {
		return this._address;
	}

	get address2() {
		return this._address2;
	}
}
