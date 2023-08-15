#  CreditBank Smart Contract Project

This project consists of a Solidity smart contract named `CreditBank` that simulates a digital bank account allowing credit management with a specified limit. Additionally, it provides a simple frontend interface to interact with the contract functions.

![image](https://github.com/Grayff/eth-avax-module2/assets/136992085/677f2922-c4b8-41df-8716-15c4f07fb9d5)


## Introduction

The `CreditBank` contract is designed to manage credit balances and limits. It features functions for adding, redeeming, and checking credit balances, all within the defined credit limit. A basic frontend application is provided to interact with the contract functions and display results.

## Frontend Application Walkthrough:

1. Initialization:

   When the contract is deployed, the constructor is executed with initial credit and limit values.

2. Viewing Credits:

   The frontend of the application can have a section to display the current credit balance using the getCredits() function.

3. Adding Credits:

   When the owner of the contract wants to add credits, they can use a button in the frontend to trigger the addCredit() function. The frontend should ensure that 
   the input credit value doesn't exceed the remaining limit.

4. Redeeming Credits:

   Similarly, the owner can redeem credits using a button linked to the redeemCredit() function. The frontend should prevent the owner from redeeming more credits 
   than available in the account.

5. Displaying Events:

   Whenever credits are added or redeemed, the events (Add and Redeem) are emitted. The frontend can listen for these events and update the display accordingly.



## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Grayff/eth-avax-module2.git
```

2. Install the dependencies ( IF THE DEPENDENCIES DOES NOT INSTALL CORRECTLY THEN USE --force ):

```bash
cd credit-bank-project

```

3. Inside the project directory, in the terminal type: npm i

4. Open two additional terminals in your VS code.
 
5. In the second terminal type: npx hardhat node.
   
6. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js.
  
7. Back in the first terminal, type npm run dev to launch the front-end

8. Open the application in your browser, the project will be running on your localhost. Typically at:

```bash
http://localhost:3000
```

9. Connect your MetaMask wallet and interact with the Credit Management Interface.


## Usage

1. **View Credits:** Open the frontend application and see the current credit balance using the `getCredits()` function.
2. **Add Credits:** Use the frontend to add credits to the account by calling the `addCredit()` function. Make sure not to exceed the credit limit.
3. **Redeem Credits:** Redeem credits using the frontend by triggering the `redeemCredit()` function. Ensure the redeemed amount is within the available credit balance.
4. **Event Updates:** The frontend listens for the `Add` and `Redeem` events emitted by the contract and updates the display accordingly.

## Contributing
If you find a bug or have a suggestion, feel free to open an issue or submit a pull request.  

## Author
Reeti Singh

## License
This project is licensed under the [MIT License](LICENSE). You are free to modify and distribute the code for personal and educational purposes.





