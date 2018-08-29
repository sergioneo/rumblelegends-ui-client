export const COMMON = {
	AMOUNT_CASH: [
		{ value: '2000', model: '$2.000' },
		{ value: '5000', model: '$5.000' },
		{ value: '10000', model: '$10.000' },
		{ value: 'otro', model: 'Otro' },
	],
	AMOUNT_OTHER: 'otro',
	VALID_STATE: {
		STEP_NUMBER: 'validateNumber',
		STEP_ALIAS: 'validateAlias',
		STEP_REGISTER: 'registerCard',
	},
	TYPE_BIP: '01',
	TYPE_ACCOUNT_BIP: 'CTV',
	SERVICES: {
		ERROR_GENERIC: 'Ha ocurrido un error',
		ERROR_401: {
			CODE: 401,
			MSG: 'Servicio no autorizado',
		},
		ERROR_404: {
			CODE: 404,
			MSG: 'Servicio no encontrado',
		},
		ERROR_500: {
			CODE: 500,
			MSG: 'Error de servidor',
		},
	},
};
