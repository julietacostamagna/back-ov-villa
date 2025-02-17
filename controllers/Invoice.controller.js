const axios = require('axios')
const { debtsCustomerVilla } = require('../services/VillaService.js')

async function getInvoice(req, res) {
	try {
		const { socios, all } =  req.body;
		const result = [];

		for (const item of socios) {
			const debts = await debtsCustomerVilla(item.num, all);
			if (!debts) {
				continue;
			}

			let invoices = { codigo: item.num, list: [] };

			for (const debt of debts) {
				let precio = parseFloat(debt.importe) < 0 ? Math.abs(debt.importe) : debt.importe;
				let status = parseFloat(debt.importe) > 0 ? 0 : 1;

				let comprobante = '';
				switch (debt.puntoVenta) {
					case 5: comprobante = 'TV';
						break;
					case 9: comprobante = 'INT';
						break;
					case 7: comprobante = 'RA';
						break;
					default:
						break;
				}

				let fact = {
					type: comprobante,
					nrovoucher: debt.numero,
					vto: debt.fechaVencimiento,
					amount: parseFloat(precio).toFixed(2),
					url: ``,
					status: status,
					number: debt.cliente,
					nombre: debt.nombre,
					domicilio: debt.domicilio
				};

				invoices.list.push(fact);
			}

			if (invoices.list.length > 0) {
				result.push(invoices);
			}
		}
	
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}


async function existInvoice(req, res) {
	try {
		const { url } = req.query
		const timeout = 5000
		const response = await axios.head(url, { timeout })
		const status = { status: response.status >= 200 && response.status < 300 ? 'existe' : 'falla' }
		const code = status.status === 'existe' ? 200 : 404
		return res.status(code).json(status)
	} catch (error) {
		return res.status(404).json({ status: 'falla' })
	}
}

module.exports = {
	getInvoice,
	existInvoice,
}
