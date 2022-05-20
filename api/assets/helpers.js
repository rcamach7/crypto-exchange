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
    };
    return [...currentPortfolio, newCryptoHolding];
  } else {
    // User owns this coin already, add to his portfolio
    const currentHoldings = currentPortfolio[indexOfPortfolioHolding];
    currentHoldings.quantity += transaction.quantity;
    currentHoldings.principle +=
      transaction.crypto.price * transaction.quantity;

    const newPortfolio = [...currentPortfolio];
    newPortfolio[indexOfPortfolioHolding] = currentHoldings;

    return newPortfolio;
  }
};

exports.processPortfolioSell = (currentPortfolio, transaction) => {
  // We know for certain the index will exist.
  const indexOfPortfolioHolding = currentPortfolio
    .map(({ crypto }) => crypto)
    .indexOf(transaction.crypto.name);

  const updatedHolding = currentPortfolio[indexOfPortfolioHolding];
};
