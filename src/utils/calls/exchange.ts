import { Contract, PayableOverrides, constants } from "ethers";
import { LooksRareProtocol } from "../../../typechain/contracts-exchange-v2/contracts/LooksRareProtocol";
import abiLooksRareProtocol from "../../abis/LooksRareProtocol.json";
import { MakerAsk, MakerBid, TakerAsk, TakerBid, Signer } from "../../types";

export const executeTakerBid = (
  signer: Signer,
  address: string,
  takerBid: TakerBid,
  makerAsk: MakerAsk,
  makerSignature: string,
  merkleRoot: string = constants.HashZero,
  merkleProof: string[] = [],
  referrer: string = constants.AddressZero,
  overrides?: PayableOverrides
) => {
  const internalOverrides: PayableOverrides =
    makerAsk.currency === constants.AddressZero ? { value: takerBid.maxPrice } : {};
  const contract = new Contract(address, abiLooksRareProtocol, signer) as LooksRareProtocol;
  return contract.executeTakerBid(takerBid, makerAsk, makerSignature, merkleRoot, merkleProof, referrer, {
    ...overrides,
    ...internalOverrides,
  });
};

export const executeTakerAsk = (
  signer: Signer,
  address: string,
  takerAsk: TakerAsk,
  makerBid: MakerBid,
  makerSignature: string,
  merkleRoot: string = constants.HashZero,
  merkleProof: string[] = [],
  referrer: string = constants.AddressZero,
  overrides?: PayableOverrides
) => {
  const internalOverrides: PayableOverrides =
    makerBid.currency === constants.AddressZero ? { value: takerAsk.minNetRatio } : {};
  const contract = new Contract(address, abiLooksRareProtocol, signer) as LooksRareProtocol;
  return contract.executeTakerAsk(takerAsk, makerBid, makerSignature, merkleRoot, merkleProof, referrer, {
    ...overrides,
    ...internalOverrides,
  });
};