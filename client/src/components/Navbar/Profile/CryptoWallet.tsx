import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material/";
import { WalletRow } from "./WalletRow";
import { getCrypto } from "../../../utilities/helpers";
import { useAppSelector } from "../../../features/";

export const CryptoWallet = () => {
  const cryptos = useAppSelector((state) => state.cryptos.value);
  const user = useAppSelector((state) => state.user.value);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="tableHeaders">Coin</TableCell>
            <TableCell className="tableHeaders" align="right">
              Owned
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Renders every individual portfolio investment */}
          {user?.portfolio.map((row) => (
            <WalletRow
              key={row.crypto}
              row={row}
              cryptoInfo={getCrypto(cryptos, row.crypto)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
