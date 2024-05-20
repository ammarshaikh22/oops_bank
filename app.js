#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    constructor() {
        this.amount = 0;
        this.condition = true;
    }
    async start() {
        const getPin = await inquirer.prompt([
            {
                message: "Create your pin",
                name: "pin",
                type: "number"
            }
        ]);
        if (getPin.pin >= 1000) {
            this.pin = getPin.pin;
            const getAmount = await inquirer.prompt([
                {
                    message: "Deposit some amount in your account",
                    type: "number",
                    name: "amount"
                }
            ]);
            if (getAmount.amount > 0 && getAmount.amount !== null) {
                this.amount = getAmount.amount;
                const moreOptions = await inquirer.prompt([
                    {
                        message: "Would you like to login in your account",
                        name: "login",
                        type: "confirm",
                        default: true
                    }
                ]);
                if (moreOptions.login === false) {
                    console.log("Thanks for making new account");
                }
                else {
                    const options = await inquirer.prompt([
                        {
                            message: "Enter you pin",
                            name: "getPin",
                            type: "number"
                        }
                    ]);
                    if (options.getPin === this.pin) {
                        while (this.condition) {
                            const nextOptions = await inquirer.prompt([
                                {
                                    message: "What would you like to do",
                                    name: "choices",
                                    type: "list",
                                    choices: ["Deposit more Amount", "Withdraw Amount", "Check Balance", "Exit"]
                                }
                            ]);
                            switch (nextOptions.choices) {
                                case "Deposit more Amount":
                                    await this.deposit();
                                    break;
                                case "Withdraw Amount":
                                    await this.withdraw();
                                    break;
                                case "Check Balance":
                                    this.check_balance();
                                    break;
                                case "Exit":
                                    this.exit();
                                    break;
                            }
                        }
                    }
                    else {
                        console.log('Enter correct pin');
                    }
                }
            }
            else {
                console.log("Enter some amount");
            }
        }
        else {
            console.log("Enter 4 digit pin");
        }
    }
    async deposit() {
        const moreAmount = await inquirer.prompt([
            {
                message: "Enter amount to deposit",
                name: "amount",
                type: "number"
            }
        ]);
        if (moreAmount.amount > 0 || moreAmount.amount !== null) {
            this.amount += moreAmount.amount;
            console.log("Deposit SuccessFully");
        }
        else {
            console.log("Enter some amount to deposit");
        }
    }
    async withdraw() {
        const remove = await inquirer.prompt([
            {
                message: "Enter amount to withdraw",
                name: "remove",
                type: "number"
            }
        ]);
        if (remove.remove !== null || remove.remove > 0) {
            let amountRemove = remove.remove;
            if (amountRemove < this.amount) {
                this.amount -= amountRemove;
            }
            else {
                console.log("Insufficient balance");
            }
        }
        else {
            console.log("Enter some amount to withdraw");
        }
    }
    check_balance() {
        console.log(`The total amount in your account is ${this.amount}`);
    }
    exit() {
        this.condition = false;
        console.log("Thanks for using my app");
    }
}
let bank = new BankAccount();
bank.start();
