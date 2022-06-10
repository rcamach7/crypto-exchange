import React from "react";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Box,
  Table,
  TableHead,
  TableBody,
  Chip,
  Avatar,
} from "@mui/material/";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Crypto } from "../../../data/models";
import { formatPrice, numberWithCommas } from "../../../assets/helpers";
import { SellCryptoModal } from "./SellCryptoModal";

interface RowType {
  row: { crypto: string; quantity: number; principle: number };
  cryptoInfo: Crypto;
}

export const WalletRow = ({ row, cryptoInfo }: RowType) => {
  const [open, setOpen] = React.useState(false);
  const { quantity, crypto, principle } = row;

  const formattedPrices = {
    value: numberWithCommas(formatPrice(quantity * cryptoInfo.price)),
    profit: formatPrice(quantity * cryptoInfo.price - principle),
    principle: numberWithCommas(formatPrice(principle)),
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ padding: "0" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          <div style={{ display: "flex" }}>
            <Avatar
              sx={{
                width: "20px",
                height: "20px",
                border: "solid black 1px",
                marginRight: "5px",
              }}
              aria-label="crypto"
              src={cryptoInfo.image}
              component="span"
            />
            {crypto}
          </div>
        </TableCell>

        <TableCell align="right">{quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className="tableRowCells"
                    >
                      Current Value
                    </TableCell>
                    <TableCell>${formattedPrices.value}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className="tableRowCells"
                    >
                      Principle
                    </TableCell>
                    <TableCell>${formattedPrices.principle}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className="tableRowCells"
                    >
                      Profit
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={numberWithCommas(formattedPrices.profit)}
                        size="small"
                        color={formattedPrices.profit > 0 ? "success" : "error"}
                        icon={<AttachMoneyIcon fontSize="small" />}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ padding: "0" }}>
                      <SellCryptoModal
                        crypto={cryptoInfo}
                        walletQuantity={row.quantity}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};