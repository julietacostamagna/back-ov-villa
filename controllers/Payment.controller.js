const { db } = require("../models/index.js");
const { debtsCustomer, phoneCustomer } = require("../services/ProcoopService.js");
const codes = require("../utils/Procoop/serviceCode.json");

async function getInvoice(req, res) {
  try {
    const { id_procoop } = req.query;
    const all = req.query.all ? true : false;
    const today = new Date();
    const debts = await debtsCustomer(id_procoop, all);
    if (debts.length === 0) {
      return res.status(200).json([]);
    }
    let invoices = {};
    let phone = "";
    const typeInvoice = codes.TF;
    for (let i in debts) {
      if (!invoices[debts[i].COD_SUM]) {
        phone = "";
        invoices[debts[i].COD_SUM] = { data: {}, list: [] };
        phone = await phoneCustomer(debts[i].COD_SUM);
        var numberPhone = phone.error ? "" : phone[0]["NUM_MED/NUMTEL"];
        invoices[debts[i].COD_SUM].data = { phoneNumber: numberPhone, account: debts[i].COD_SUM };
      }
      if (debts[i].DEB_CRE !== 1) continue;
      var vto = today > new Date(debts[i].VTO1) ? debts[i].VTO2 : debts[i].VTO1;
      var total = today > new Date(debts[i].VTO1) ? debts[i].TOTAL2 : debts[i].TOTAL1;
      var pdf =
        debts[i]["COD_SUM"].toString().padStart(6, "0") +
        debts[i]["COD_COM"].toString().padStart(4, "0") +
        debts[i]["SUC_COM"].toString().padStart(4, "0") +
        debts[i]["NUM_COM"].toString().padStart(8, "0");
      var voucher = `${typeInvoice[debts[i].COD_COM] || "CSB"}-${debts[i]["SUC_COM"].toString().padStart(4, "0")}-${debts[i]["NUM_COM"].toString().padStart(8, "0")}`;
      var invoiceExists = false;
      if (debts[i].NUMERO) {
        for (let j in invoices[debts[i].COD_SUM].list) {
          if (invoices[debts[i].COD_SUM].list[j].number && invoices[debts[i].COD_SUM].list[j].number === debts[i].NUMERO) {
            invoiceExists = true;
            invoices[debts[i].COD_SUM].list[j].type = debts[i].TIPO === "EN" ? `EN-${invoices[debts[i].COD_SUM].list[j].type}` : `${invoices[debts[i].COD_SUM].list[j].type}-${debts[i].TIPO}`;
            invoices[debts[i].COD_SUM].list[j].nrovoucher = voucher;
            invoices[debts[i].COD_SUM].list[j].url = debts[i].TIPO === "EN" ? `https://facturas.coopmorteros.coop/${pdf}.pdf` : invoices[debts[i].COD_SUM].list[j].url;
            invoices[debts[i].COD_SUM].list[j].url = debts[i].TIPO === "EN" ? debts[i].ID_FAC : invoices[debts[i].COD_SUM].list[j].url;
            invoices[debts[i].COD_SUM].list[j].amount = parseFloat(parseFloat(invoices[debts[i].COD_SUM].list[j].amount) + parseFloat(total)).toFixed(2);
            break;
          }
        }
      }
      if (!invoiceExists) {
        var status = 1;
        if (parseInt(debts[i].SALDO) > 0) {
          status = 0;
        }
        var fact = {
          id: debts[i].ID_FAC,
          type: debts[i].TIPO,
          nrovoucher: voucher,
          period: debts[i].PERIODO,
          vto: vto,
          amount: total,
          url: `https://facturas.coopmorteros.coop/${pdf}.pdf`,
          status: status,
          number: debts[i].NUMERO,
        };
        invoices[debts[i].COD_SUM].list.push(fact);
      }
    }
    return res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getInvoice,
};
