// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Todo {
    struct Todos {
        string title;
        string description;
        bool isDone;
    }

    Todos public todo;

    function createTodo(string memory _title, string memory _description) external  {
        todo = Todos(_title, _description, false);
    }

    function TodoStatus() external  {
        todo.isDone = !todo.isDone;
    }

    function updateTodo(string memory _title, string memory _description, bool _isDone) external  {
        todo.title = _title;
        todo.description = _description;
        todo.isDone = _isDone;
    }

    function deleteTodo() external  {
        delete todo;
    }
}
