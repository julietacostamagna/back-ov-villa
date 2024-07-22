const axios = require('axios')
const { db } = require('../models/index.js')
const { debtsCustomer, phoneCustomer } = require('../services/ProcoopService.js')
const { debtsCustomerVilla } = require('../services/VillaService.js')

const codes = require('../utils/Procoop/serviceCode.json')

// async function getInvoice(req, res) {
// 	try {
// 		const { id_villa } = req.query
// 		const all = req.query.all ? true : false
// 		// const today = new Date()
// 		const debts = await debtsCustomerVilla(id_villa, all)
// 		if (!debts) {
// 			return res.status(404).json({ message: 'Error al buscar los datos' })
// 		}
// 		let invoices = {}
// 		// let phone = ''
// 		// const typeInvoice = codes.TF
// 		for (let i in debts) {
// 			// if (!invoices[debts[i].COD_SUM]) {
// 			// 	phone = ''
// 			// 	invoices[debts[i].COD_SUM] = { data: {}, list: [] }
// 			// 	phone = await phoneCustomer(debts[i].COD_SUM)
// 			// 	var numberPhone = phone.error ? '' : phone[0]['NUM_MED/NUMTEL']
// 			// 	invoices[debts[i].COD_SUM].data = { phoneNumber: numberPhone, account: debts[i].COD_SUM }
// 			// }
// 			// if (debts[i].DEB_CRE !== 1) continue
// 			// var vto = today > new Date(debts[i].VTO1) ? debts[i].VTO2 : debts[i].VTO1
// 			// var total = today > new Date(debts[i].VTO1) ? debts[i].TOTAL2 : debts[i].TOTAL1
// 			// var pdf = debts[i]['COD_SUM'].toString().padStart(6, '0') + debts[i]['COD_COM'].toString().padStart(4, '0') + debts[i]['SUC_COM'].toString().padStart(4, '0') + debts[i]['NUM_COM'].toString().padStart(8, '0')
// 			// var voucher = `${typeInvoice[debts[i].COD_COM] || 'CSB'}-${debts[i]['SUC_COM'].toString().padStart(4, '0')}-${debts[i]['NUM_COM'].toString().padStart(8, '0')}`
// 			// var invoiceExists = false
// 			// for (let j in invoices[debts[i].COD_SUM].list) {
// 			// 	if (invoices[debts[i].COD_SUM].list[j].number && invoices[debts[i].COD_SUM].list[j].number === debts[i].NUMERO) {
// 			// 		invoiceExists = true
// 			// 		invoices[debts[i].COD_SUM].list[j].type = debts[i].TIPO === 'EN' ? `EN-${invoices[debts[i].COD_SUM].list[j].type}` : `${invoices[debts[i].COD_SUM].list[j].type}-${debts[i].TIPO}`
// 			// 		invoices[debts[i].COD_SUM].list[j].nrovoucher = voucher
// 			// 		invoices[debts[i].COD_SUM].list[j].url = debts[i].TIPO === 'EN' ? `https://facturas.coopmorteros.coop/${pdf}.pdf` : invoices[debts[i].COD_SUM].list[j].url
// 			// 		invoices[debts[i].COD_SUM].list[j].url = debts[i].TIPO === 'EN' ? debts[i].ID_FAC : invoices[debts[i].COD_SUM].list[j].url
// 			// 		invoices[debts[i].COD_SUM].list[j].amount = parseFloat(parseFloat(invoices[debts[i].COD_SUM].list[j].amount) + parseFloat(total)).toFixed(2)
// 			// 		break
// 			// 	}
// 			// }
// 			// if (!invoiceExists) {
// 				var status = 1
// 				if (parseInt(debts[i].importe) > 0) {
// 					status = 0
// 				}
// 				var fact = {
// 					id: debts[i].ID_FAC,
// 					type: debts[i].tipoComprobante,
// 					nrovoucher: numero,
// 					vto: debts[i].fechaVencimiento,
// 					amount: debts[i].importe,
// 					url: ``,
// 					status: status,
// 					number: debts[i].cliente,
// 				}
// 				invoices.list.push(fact)
// 			// }
// 		}
// // return invoices;
// 		return res.status(200).json(invoices)
// 	} catch (error) {
// 		return res.status(400).json({ message: error })
// 	}
// }

async function getInvoice(req, res) {
	try {
		const { id_villa } = req.query;
		const all = req.query.all ? true : false;
		const debts = await debtsCustomerVilla(id_villa, all);

		if (!debts) {
			return res.status(404).json({ message: 'Error al buscar los datos' });
		}

		let invoices = { list: [] }; 

		for (let i in debts) {

			let status = 1;
			if (parseInt(debts[i].importe) > 0) {
				status = 0;
			}

			let fact = {
				id: debts[i].ID_FAC,
				type: debts[i].tipoComprobante,
				nrovoucher: debts[i].numero,
				vto: debts[i].fechaVencimiento,
				amount: debts[i].importe,
				url: ``,
				status: status,
				number: debts[i].cliente,
			};

			invoices.list.push(fact);
		}

		return res.status(200).json(invoices);
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
