exports.processPortfolioPurchase = (currentPortfolio, transaction) => {
  // Will check to see if we have this crypto coin already in out wallet.
  const indexOfPortfolioHolding = currentPortfolio
    .map(({ crypto }) => crypto)
    .indexOf(transaction.crypto.name);

  if (indexOfPortfolioHolding === -1) {
    // We have not purchased this crypto before, so we will create a new transaction instance and return it appended with any other coins purchased.
    let newCryptoHolding = {
      crypto: transaction.crypto.name,
      quantity: transaction.quantity,
      principle: transaction.crypto.price * transaction.quantity,
      transactions: [
        {
          quantity: transaction.quantity,
          purchasePrice: transaction.crypto.price,
        },
      ],
    };
    return [...currentPortfolio, newCryptoHolding];
  } else {
    // User owns this coin already, add to his portfolio
    const currentHoldings = currentPortfolio[indexOfPortfolioHolding];

    currentHoldings.quantity += transaction.quantity;
    currentHoldings.principle +=
      transaction.crypto.price * transaction.quantity;
    currentHoldings.transactions = [
      ...currentHoldings.transactions,
      {
        quantity: transaction.quantity,
        purchasePrice: transaction.crypto.price,
      },
    ];

    const newPortfolio = [...currentPortfolio];
    newPortfolio[indexOfPortfolioHolding] = currentHoldings;

    return newPortfolio;
  }
};

// Validation checks before confirm user has enough coins to sell the requested quantity.
exports.processPortfolioSell = (currentPortfolio, transaction) => {
  // We know for certain the index will exist.
  const indexOfPortfolioHolding = currentPortfolio
    .map(({ crypto }) => crypto)
    .indexOf(transaction.crypto.name);

  const updatedHolding = currentPortfolio[indexOfPortfolioHolding];
  const updatedPortfolio = [...currentPortfolio];
  if (updatedHolding.quantity === transaction.quantity) {
    // Remove the entire holding from user - since he is selling all coins
    updatedPortfolio.splice(indexOfPortfolioHolding, 1);
  } else {
    // Update values in holding since he will have remaining coins
    updatedHolding.quantity -= transaction.quantity;
    if (
      updatedHolding.principle -
        transaction.crypto.price * transaction.quantity <
      0
    ) {
      // If user has cashed out more than he is invested - default principle to 0 and prevent negative values. It is assumed rest of holdings is not profit.
      updatedHolding.principle = 0;
    } else {
      updatedHolding.principle -=
        transaction.crypto.price * transaction.quantity;
    }
  }
  return updatedPortfolio;
};
