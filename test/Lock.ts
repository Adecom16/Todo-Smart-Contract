import { expect } from "chai";
import { ethers } from "hardhat";
import { Todo } from "../typechain-types";
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Todo", function () {
 
  async function deployTodoContract() {
    const TodoContract = await ethers.getContractFactory("Todo");
    const todoContract = await TodoContract.deploy();
    const owner = await ethers.getSigners();
    return { todoContract, owner };
  }

 
  beforeEach(async function () {
    await loadFixture(deployTodoContract);
  });

  describe("Deployment", function () {
    it("Should deploy the Todo contract", async function () {
      const { todoContract } = await loadFixture(deployTodoContract);
      if (!todoContract.address) {
        throw new Error("Todo contract not deployed");
      }
    });

    it("Should initialize with an empty todo list", async function () {
      const { todoContract } = await loadFixture(deployTodoContract);
      const todos = await todoContract.todos();
      expect(todos.length).to.equal(0);
    });
  });

  describe("Functionality", function () {
    it("Should allow creating a new todo", async function () {
      const { todoContract } = await loadFixture(deployTodoContract);
      await todoContract.createTodo(
        "Buy groceries",
        "Buy apples, bananas, and bread"
      );
      const todo = await todoContract.todo();
      expect(todo.title).to.equal("Buy groceries");
      expect(todo.description).to.equal("Buy apples, bananas, and bread");
      expect(todo.isDone).to.equal(false);
    });

    it("Should allow toggling the status of a todo", async function () {
      const { todoContract } = await loadFixture(deployTodoContract);
      await todoContract.createTodo(
        "Buy groceries",
        "Buy apples, bananas, and bread"
      );
      await todoContract.toggleTodoStatus();
      const todo = await todoContract.todo();
      expect(todo.isDone).to.equal(true);
    });

    it("Should allow updating a todo", async function () {
      const { todoContract } = await loadFixture(deployTodoContract);
      await todoContract.createTodo(
        "Buy groceries",
        "Buy apples, bananas, and bread"
      );
      await todoContract.updateTodo(
        "Buy fruits",
        "Buy apples, bananas, and oranges",
        true
      );
      const todo = await todoContract.todo();
      expect(todo.title).to.equal("Buy fruits");
      expect(todo.description).to.equal("Buy apples, bananas, and oranges");
      expect(todo.isDone).to.equal(true);
    });

    it("Should allow deleting a todo", async function () {
      const { todoContract } = await loadFixture(deployTodoContract);
      await todoContract.createTodo(
        "Buy groceries",
        "Buy apples, bananas, and bread"
      );
      await todoContract.deleteTodo();
      const todo = await todoContract.todo();
      expect(todo.title).to.equal("");
      expect(todo.description).to.equal("");
      expect(todo.isDone).to.equal(false);
    });
  });
});
