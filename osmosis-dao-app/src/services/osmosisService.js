import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const RPC_ENDPOINT = "https://osmosis-rpc.polkachu.com"; // Replace with the correct Osmosis RPC endpoint
const CONTRACT_ADDRESS = "osmo1a40j922z0kwqhw2nn0nx66ycyk88vyzcs73fyjrd092cjgyvyjksrd8dp7"; // Replace with your actual contract address

async function getOsmosisClient() {
  return await SigningCosmWasmClient.connect(RPC_ENDPOINT);
}

export async function getDaoInfo() {
  const client = await getOsmosisClient();
  const query = { info: {} };
  const response = await client.queryContractSmart(CONTRACT_ADDRESS, query);
  return response;
}

export async function getStakedBalance(address) {
  const client = await getOsmosisClient();
  // Assuming there's a query to get staked balance. If not, we might need to adjust this.
  const query = { get_staked_balance: { address } };
  const response = await client.queryContractSmart(CONTRACT_ADDRESS, query);
  return response.balance;
}

export async function getPendingRewards(address) {
  const client = await getOsmosisClient();
  const query = { get_pending_rewards: { address } };
  const response = await client.queryContractSmart(CONTRACT_ADDRESS, query);
  return response.pending_rewards;
}