import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["marketablestock"].public.v1 + "/warehouses";

export interface IProductSupplyOptions extends Record<string, any> {
  pids: string | string[];
  warehouses: number;
}

const defaultProductSupplyOptions: IProductSupplyOptions = {
  pids: "",
  warehouses: 0,
};

async function getProductCardsRequest(
  url: string,
  options: IProductSupplyOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  if (Array.isArray(options.pids)) {
    options.pids = options.pids.join(",");
  }

  url += `/${options.warehouses}/products/${options.pids}`;

  const necessary_headers = {
    accept: "application/json, text/plain, *!/!*",
    ...headers,
  };

  const response = await getRequest(url, {}, necessary_headers);

  return await response.json();
}

export async function getProductSupply(
  productSupplyOptions: IProductSupplyOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productSupplyOptions = {
    ...defaultProductSupplyOptions,
    ...productSupplyOptions,
  };
  return getProductCardsRequest(url, productSupplyOptions, headers);
}
