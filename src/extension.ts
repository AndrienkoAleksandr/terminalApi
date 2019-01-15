
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand("extension.terminalApi.newTerminalCreatedWithHelpArgs", () => {
        const terminal = vscode.window.createTerminal("Sh Terminal", "sh", ["-l"]);
        terminal.show();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("onCommand:extension.terminalApi.newTerminalCreatedWithHelpOptions", () => {
        const termOptions: vscode.TerminalOptions = {
            name: "Test terminal",
            shellPath: "/bin/bash",
            shellArgs: ["-l"],
            env: { "HELLO": "Hello Theia." },
            // cwd: "/home/user/projects/che" // any existed absolute path or url to the folder
        }
        const terminal = vscode.window.createTerminal(termOptions);
        terminal.show();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("onCommand:extension.terminalApi.newTerminalSendTextToTheTerminal", () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        terminal.sendText("clear && echo Theia plugin terminal.\n");
    }));

    context.subscriptions.push(vscode.commands.registerCommand("onCommand:extension.terminalApi.newTerminalHideTerminalPanel", () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        setTimeout(function() {
            terminal.hide();
        }, 3000);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("onCommand:extension.terminalApi.newTerminalShowTerminalWithDelay", () => {
        const terminal = createTerminalWithOptions();
        setTimeout(function() {
            terminal.show();
        }, 3000);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("onCommand:extension.terminalApi.newTerminalDispose", () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        setTimeout(function() {
            terminal.dispose();
        }, 3000);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("onCommand:extension.terminalApi.newTerminalSubscribeOnDidCloseTerminalEvent", () => {
        const terminal = createTerminalWithOptions();
        terminal.show();
        terminal.processId.then(id => {
            vscode.window.onDidCloseTerminal(async (term) => {
                const curId = await term.processId;
                if (curId === id) {
                    console.log("Terminal closed, id: ", id);
                }
            }, id);
        });
    }));
}

function createTerminalWithOptions(): vscode.Terminal {
    const termOptions: vscode.TerminalOptions = {
        name: "Test terminal",
        shellPath: "/bin/bash"
    }
    return vscode.window.createTerminal(termOptions);
}

export function deactivate() {}
