#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const FILE_PATH = "./tasks.json";

if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

function readTasks() {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully: ${newTask.id} - ${newTask.description}`);
}

function listTasks(status) {
    const tasks = readTasks();
    const filteredTasks = tasks;
    if (status) {
        filteredTasks = tasks.filter(task => task.status === status);
    }
    if (filteredTasks.length === 0) {
        console.log(`No tasks of status '${status}' found.`);
        return;
    }
    filteredTasks.forEach(task => {
        console.log(`
            <-- Task Details -->
            ID: ${task.id},
            Description: ${task.description},
            Status: ${task.status},
            Created At: ${task.createdAt},
            Updated At: ${task.updatedAt}`
    );
    });
}

function markTask(id, status) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as ${status}: ${task.id} - ${task.description}`);
}

function updateTask(id, newDescription) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task updated: ${task.id} - ${task.description}`);
}

function deleteTask(id) {
    let tasks = readTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    if (tasks.length === initialLength) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    saveTasks(tasks);
    console.log(`Task successfully deleted with ID: ${id}`);
}

const [,, command, ...args] = process.argv;

switch (command) {
    case 'add':
        addTask(args.join(' '));
        break;
    case 'list':
        listTasks(args[0]);
        break;
    case 'complete' || "mark-done":
        markTask(args[0], "done");
        break;
    case 'delete':
        deleteTask(args[0]);
        break;
    case 'update':
        updateTask(args[0], args.slice(1).join(' '));
        break;
    case "mark-in-progress":
        markTask(args[0], "in-progress");
        break;
    default:
        console.log(`
            Unknown command. 
            Use 'add', 'list', 'complete', 'delete', or 'update'.`);
}
