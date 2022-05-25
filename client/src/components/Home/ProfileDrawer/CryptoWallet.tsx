import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUserContext } from "../../../hooks/useUserContext";
import { WalletRow } from "./WalletRow";
import { getCrypto } from "../../../assets/helpers";

export const CryptoWallet = () => {
  const { user, cryptos } = useUserContext();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Crypto Wallet</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
