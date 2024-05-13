const { db } = require("../models/index.js");
const { debtsCustomer } = require("../services/ProcoopService.js");
const codes = require("../utils/Procoop/serviceCode.json");

async function getInvoice(req, res) {
  try {
    const { id_procoop } = req.query;
    const debts = await debtsCustomer(id_procoop);
    if (debts.length === 0) {
      return res.status(200).json([]);
    }
    let invoices = [];
    let phone = "";
    const $typeInvoice = codes.TF;
    return res.status(200).json(debts);

    /* $invoices = array();
            $phone = "";
            //ARRAY DE TODO LOS TIPOS DE FACTURAS
            $typeInvoice = ProcoopController::getArrayCodProcoop("TF");
            //BUSCO TODOS LOS LOGS EXITOSOS EN DB
            $pagosExitosos = Payment::whereIn('nro_socio', array_column($json_datos, 'COD_SOC'))->where('PagoExitoso', 1)->get();
            foreach ($json_datos as $value) {
                if (!isset($invoices[$value["COD_SUM"]])) {
                    $phone = "";
                    //GENERO UN NUEVO ARRAY PARA DIVIDIR LA INFORMACION, CON LOS DATOS QUE VAN A ESTAR EN LA TABLA PARA QUE SEA MAS SIMPLE
                    //LA IMPLEMENTACION DE LOS DATOS EN LA TABLA
                    $invoices[$value["COD_SUM"]] = array("data" => [], "list" => []);
                    
                    $phone = ProcoopController::getPhone($value["COD_SUM"]);
                    $invoices[$value["COD_SUM"]]["data"] = array("phoneNumber" => $phone, "account" => $value["COD_SUM"]);
                }
                //VALIDO PARA NO MOSTRAR NOTAS DE CREDITO
                if ($value['DEB_CRE'] != 1) continue;
                //CONTROLO EL VENCIMIENTO, SI EL DIA ACTUAL ES MAYOR AL VENCIMIENTO 1, TANTO EL VENCIMIENTO COMO EL TOTAL SE PONE EL 2
                $Vto = date('Y-m-d H:i:s') > date('Y-m-d H:i:s', strtotime($value['VTO1'])) ? $value['VTO2'] : $value['VTO1'];
                $Total = date('Y-m-d H:i:s') > date('Y-m-d H:i:s', strtotime($value['VTO1'])) ? $value['TOTAL2'] : $value['TOTAL1'];
                //FORMATEO EL VALOR A FLOAT Y SACO LAS COMAS EN EL MIL. 
                $Total = round(floatval(str_replace(',', '', $Total)), 2);
                //GENERO EL ID PARA ENCONTRAR EL ARCHIVO PDF PARA DESCARGAR LA FACTURA
                $idPdf = substr('000000' . $value["COD_SUM"], -6) . substr('0000' . $value["COD_COM"], -4) . substr('0000' . $value["SUC_COM"], -4) . substr('00000000' . $value["NUM_COM"], -8);
                //GENERO EL NUMERO DE COMPROBANTE CON DENOMINACION Y CODIGO
                $voucher = ($typeInvoice[$value['COD_COM']] ?? "CSB") . "-" . substr('0000' . $value["SUC_COM"], -4) . "-" . substr('00000000' . $value["NUM_COM"], -8);
                //CREO UNA VARIABLE PARA CONTROLAR SI EXISTE UN REGISTRO CON EL NUMERO QUE TRAEMOS EN VALUE EN CASO CONTRARIO LO CREO
                $invoiceExists = false;
                //VALIDO EL NUMERO ES DIFERENTE DE 0 QUIERE DECIR QUE COMPARTE ARCHIVO CON OTRA FACTURA Y LOS DEBO UNIR
                if ($value['NUMERO'] != "") {
                    //RECORRO TODAS LAS FACTURAS CARGADAS Y ACTUALIZO LOS DATOS PARA UNIR LA INFORMACION SEGUN LA FACTURA
                    foreach ($invoices[$value["COD_SUM"]]["list"] as &$item) {
                        if (isset($item['number']) && $item['number'] == $value["NUMERO"]) {
                            $item["type"] = $value['TIPO'] == "EN" ?  $value['TIPO'] . "-" . $item['type'] : $item['type'] . "-" . $value['TIPO'];
                            $item["nrovoucher"] .= "\n" . $voucher;
                            $item["amount"] = round(($item["amount"] + $Total), 2);
                            $item["url"] = $value['TIPO'] == "EN" ? "https://facturas.coopmorteros.coop/$idPdf.pdf" : $item["url"];
                            $item["url"] = $value['TIPO'] == "EN" ? $value['ID_FAC'] : $item["url"];
                            $invoiceExists = true;
                            break;
                        }
                    };
                }
                if (!$invoiceExists) {
                    //BUSCO EN LOS REGISTROS DE PAGOS EXITOSOS DE LA BASE DE DATOS EN LA COLUMNA idReferenciaOperacion
                    //GENERO CON pluck UN ARRAY DE LOS DATOS DE ESA COLUMNA Y DESPUES CON contains VEO SI ESTE ARRAY CONTIENE EL VALOR QUE LE PASO ENTRE PARENTESIS
                    //SE EXISTE QUIERE DECIR QUE EL PAGO SE REALIZO CON EXITO
                    if(intval($value["SALDO"]) > 0){
                        $status = $pagosExitosos->pluck('idReferenciaOperacion')->contains($value['NUMERO']) || $pagosExitosos->pluck('idReferenciaOperacion')->contains($value['ID_FAC']) ? 2 : 0;
                    }else{
                        $status = 1;
                    }
                    $invocie  = array(
                        "id" => $value['ID_FAC'],
                        "type" => $value['TIPO'],
                        "nrovoucher" => $voucher,
                        "period" => $value["PERIODO"],
                        "vto" => date('Y-m-d', strtotime($Vto)),
                        "amount" => $Total,
                        "url" => "https://facturas.coopmorteros.coop/$idPdf.pdf",
                        "status" => $status,
                        "number" => $value["NUMERO"]
                    );
                    array_push($invoices[$value["COD_SUM"]]["list"], $invocie);
                }
            }
            //SE ELIMINA EL ELEMENTO NUMBER PORQUE TOTAL NO ES UTILIZADO EN LA TABLA
            foreach ($invoices as &$account) {
                foreach ($account["list"] as &$invoice) {
                    unset($invoice['number']);
                }
            }
            return $invoices; */
  } catch (error) {}
}

module.exports = {
  getInvoice,
};
