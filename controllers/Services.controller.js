const { serviceCustomer, consumoCustomer, Persona_x_COD_SOC } = require("../services/ProcoopService.js");
const codes = require("../utils/Procoop/serviceCode.json");

async function customerServices(req, res) {
  try {
    const data = {};
    const { id_procoop } = req.query;
    if (!id_procoop) return res.json({ error: 404, msj: "Usuario no encontrado" });
    const dataSoc = { type: "COD_SOC", number: id_procoop };
    const services = await serviceCustomer(dataSoc);
    const serviceCodes = codes.SV;
    for (let i in services) {
      let typeService = serviceCodes[services[i].COD_SER] || null;
      if (!typeService) {
        continue;
      }
      if (!data[typeService]) {
        data[typeService] = {};
      }
      if (!data[typeService][services[i].COD_SUM]) {
        data[typeService][services[i].COD_SUM] = {
          address: `${services[i].CALLECUENTA} ${parseInt(services[i].ALTURACALLECUENTA)}`,
          account: services[i].COD_SUM,
          detail: services[i]["NUM_MED/NUMTEL"] ? (typeService === "TELEFONO" ? "TEL " : "MEDIDOR Nº ") + services[i]["NUM_MED/NUMTEL"] : "",
          status: !services[i].BAJA_ADM ? 1 : 0,
          numService: services[i].COD_SER,
        };
      }
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
async function customerConsumption(req, res) {
  try {
    const { id_procoop } = req.query;
    if (!id_procoop) return res.json({ error: 404, msj: "Usuario no encontrado" });
    const dataSoc = { type: "COD_SOC", number: id_procoop };
    const services = await serviceCustomer(dataSoc);
    const serviceCodes = codes.SV;
    let graphData = { water: { info: {}, data: [], label: [] }, electric: { info: {}, data: [], label: [] } };
    for (let i in services) {
      if (services[i].BAJA_ADM) continue;
      let nameService = serviceCodes[services[i].COD_SER] || null;
      if (nameService == serviceCodes[6]) {
        var dataSearch = { ser: services[i].COD_SER, account: services[i].COD_SUM };
        var consumpts = await consumoCustomer(dataSearch);
        graphData.water.info = {
          account: services[i].COD_SUM,
          addresse: `${services[i].CALLECUENTA} ${parseInt(services[i].ALTURACALLECUENTA)}`,
          NumMedidor: services[i]["NUM_MED/NUMTEL"],
          difConsumo: parseFloat(consumpts[0].consumo) - parseFloat(consumpts[consumpts.length - 1].consumo),
        };
        for (let j in consumpts) {
          graphData.water.data.push(consumpts[j].consumo);
          graphData.water.label.push(consumpts[j].periodo);
        }
      }
      if (nameService == serviceCodes[1]) {
        var dataSearch = { ser: services[i].COD_SER, account: services[i].COD_SUM };
        var consumpts = await consumoCustomer(dataSearch);
        graphData.electric.info = {
          account: services[i].COD_SUM,
          addresse: `${services[i].CALLECUENTA} ${parseInt(services[i].ALTURACALLECUENTA)}`,
          NumMedidor: services[i]["NUM_MED/NUMTEL"],
          difConsumo: parseFloat(consumpts[0].consumo) - parseFloat(consumpts[consumpts.length - 1].consumo),
        };
        for (let j in consumpts) {
          graphData.electric.data.push(consumpts[j].consumo);
          graphData.electric.label.push(consumpts[j].periodo);
        }
      }
    }
    return res.status(200).json(graphData);
  } catch (error) {
    console.log(error);
  }
}

async function customerServicesDetail(req, res) {
  try {
    const { cod_sum, service } = req.query;
    if (!cod_sum || !service) return res.status(500).json({ error: "Falta información" });
    const serviceCode = codes.SV;
    if (!serviceCode[service]) return res.status(500).json({ error: "Servicio inválido" });
    let result;
    switch (serviceCode[service]) {
      case "ELECTRICIDAD":
        result = await getDataServiceGral(cod_sum);
        break;
      case "TV":
        result = await getDataServiceGral(cod_sum);
        break;
      case "SENSA":
        result = await getDataServiceGral(cod_sum);
        break;
      case "TELEFONO":
        result = await getDataServiceGral(cod_sum);
        break;
      case "INTERNET":
        result = await getDataServiceGral(cod_sum);
        break;
      case "SEPELIO":
        result = await getDataServiceGral(cod_sum);
        break;
      case "BANCO DE SANGRE":
        result = await getDataServiceGral(cod_sum);
        break;
      case "AGUA":
        result = await getDataServiceGral(cod_sum);
        break;
      default:
        return res.status(500).json({ error: "Servicio inválido" });
    }
    return res.status(500).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function getDataServiceGral(number) {
  const dataSoc = { type: "cod_sum", number };
  const services = await serviceCustomer(dataSoc);
  const customer = await Persona_x_COD_SOC(services[0].COD_SOC)[0];
  return customer;
}

module.exports = {
  customerServices,
  customerConsumption,
  customerServicesDetail,
};
