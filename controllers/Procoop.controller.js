const City = require("../models/city.js");
const State = require("../models/state.js");
const { ListCity, ListState, serviceCustomer, consumoCustomer } = require("../services/ProcoopService.js");
const codes = require("../utils/Procoop/serviceCode.json");

async function migrationCity(req, res) {
  try {
    const listCities = await ListCity();
    let citiesOfi = [];
    if (listCities) {
      citiesOfi = await listCities.map((item) => {
        return { COD_LOC: item.COD_LOC, DES_LOC: item.DES_LOC, COD_POS: item.COD_POS, COD_PCI: item.COD_PCI };
      });
    }
    const resultadd = await City.bulkCreate(citiesOfi);
    return res.status(200).json(resultadd);
  } catch (error) {
    console.log(error);
    return res.json({ error, msj: "error" });
  }
}
async function migrationState(req, res) {
  try {
    const ListStates = await ListState();
    let listStateOfi = [];
    if (ListStates) {
      listStateOfi = await ListStates.map((item) => {
        return { COD_PRO: item.COD_PRO, DES_PRO: item.DES_PRO, COD_AFIP: item.COD_AFIP };
      });
    }
    const resultadd = await State.bulkCreate(listStateOfi);
    return res.status(200).json(resultadd);
  } catch (error) {
    console.log(error);
    return res.json({ error, msj: "error" });
  }
}
async function customerServices(req, res) {
  try {
    const data = {};
    const { id_procoop } = req.query;
    if (!id_procoop) return res.json({ error: 404, msj: "Usuario no encontrado" });
    const services = await serviceCustomer(id_procoop);
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
    const services = await serviceCustomer(id_procoop);
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

module.exports = {
  migrationCity,
  migrationState,
  customerServices,
  customerConsumption,
};
