"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const NormalLwc_1 = require("./NormalLwc");
const LMS_1 = require("./LMS");
const ParentWithChild_1 = require("./ParentWithChild");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "createlwc" is now active!');
    let disposable = vscode.commands.registerCommand('createlwc.createlwc', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Create lwc from Quick LWC!');
        singleSelectionFunc();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
async function singleSelectionFunc() {
    // singleSelection
    const item = await vscode.window.showQuickPick(['NormalLWC', 'ParentWithChild', 'LMS'], { placeHolder: 'Please Select an item', canPickMany: false });
    if (item === 'NormalLWC') {
        createOne('lwc', []);
    }
    else if (item === 'LMS') {
        let result = await createOne('MessageChannel', []);
        if (result !== undefined) {
            await createOne('subscriber', result);
            await createOne('publisher', result);
        }
    }
    else if (item === 'ParentWithChild') {
        let result = await createOne('ChildLWC', []);
        if (result !== undefined) {
            await createOne('ParentLWC', result);
        }
    }
}
async function createOne(newname, result) {
    let options = {
        prompt: "Label: ",
        placeHolder: "Please input the name of " + newname
    };
    const itemname = await vscode.window.showInputBox(options);
    if (!itemname)
        return;
    let objectNM;
    let xml_Pages;
    if (newname !== 'MessageChannel') {
        //multipleSelections
        xml_Pages = await vscode.window.showQuickPick(['RecordPage', 'AppPage', 'HomePage', 'Community'], { placeHolder: 'Please Select Which scenerio to display', canPickMany: true });
        if (!xml_Pages)
            return;
        if (xml_Pages.length !== 0 && xml_Pages.includes('RecordPage')) {
            let options = {
                prompt: "Label: ",
                placeHolder: "Please input one object name for RecordPage"
            };
            objectNM = await vscode.window.showInputBox(options);
        }
        //create a folder
        if (vscode.workspace.workspaceFolders !== undefined) {
            const wsPath = vscode.workspace.workspaceFolders[0].uri.path + '/force-app/main/default/lwc'; // gets the path of the first workspace folder
            const wsedit = new vscode.WorkspaceEdit();
            const filePath = vscode.Uri.file(wsPath + '/' + itemname + '/' + itemname + '.html');
            const filePath2 = vscode.Uri.file(wsPath + '/' + itemname + '/' + itemname + '.js');
            const filePath3 = vscode.Uri.file(wsPath + '/' + itemname + '/' + itemname + '.js-meta.xml');
            vscode.window.showInformationMessage(filePath.toString());
            wsedit.createFile(filePath, { ignoreIfExists: true });
            wsedit.createFile(filePath2, { ignoreIfExists: true });
            wsedit.createFile(filePath3, { ignoreIfExists: true });
            if (newname === 'lwc') {
                let NormalLWC_temp = new NormalLwc_1.NormalLWC();
                wsedit.insert(filePath, new vscode.Position(0, 0), NormalLWC_temp.makeHtmlcode());
                wsedit.insert(filePath2, new vscode.Position(0, 0), NormalLWC_temp.makeJScode(itemname));
                wsedit.insert(filePath3, new vscode.Position(0, 0), NormalLWC_temp.makeXMLcode(itemname, xml_Pages, objectNM ? objectNM : ''));
            }
            else if (newname === 'subscriber') {
                let LMS_temp = new LMS_1.SUBLMS();
                wsedit.insert(filePath, new vscode.Position(0, 0), LMS_temp.makeSubHtml());
                wsedit.insert(filePath2, new vscode.Position(0, 0), LMS_temp.makeSubJS(itemname, result[1], result[0])); //result[0] = fieldname;result[1]= lastTimeitemname
                wsedit.insert(filePath3, new vscode.Position(0, 0), LMS_temp.makeXMLcode(itemname, xml_Pages, objectNM ? objectNM : ''));
            }
            else if (newname === 'publisher') {
                let LMS_temp = new LMS_1.PUBLMS();
                wsedit.insert(filePath, new vscode.Position(0, 0), LMS_temp.makePubHtml());
                wsedit.insert(filePath2, new vscode.Position(0, 0), LMS_temp.makePubJS(itemname, result[1], result[0])); //result[0] = fieldname;result[1]= lastTimeitemname
                wsedit.insert(filePath3, new vscode.Position(0, 0), LMS_temp.makeXMLcode(itemname, xml_Pages, objectNM ? objectNM : ''));
            }
            else if (newname === 'ChildLWC') {
                let LMS_temp = new ParentWithChild_1.CHILD();
                wsedit.insert(filePath, new vscode.Position(0, 0), LMS_temp.makeCHILDHtml());
                wsedit.insert(filePath2, new vscode.Position(0, 0), LMS_temp.makeCHILDJS(itemname)); //result[0] = fieldname;result[1]= lastTimeitemname
                wsedit.insert(filePath3, new vscode.Position(0, 0), LMS_temp.makeXMLcode(itemname, xml_Pages, objectNM ? objectNM : ''));
            }
            else if (newname === 'ParentLWC') {
                let LMS_temp = new ParentWithChild_1.Parent();
                wsedit.insert(filePath, new vscode.Position(0, 0), LMS_temp.makeParentHtml(result[1]));
                wsedit.insert(filePath2, new vscode.Position(0, 0), LMS_temp.makeParentJS(itemname, result[1])); //result[0] = fieldname;result[1]= lastTimeitemname
                wsedit.insert(filePath3, new vscode.Position(0, 0), LMS_temp.makeXMLcode(itemname, xml_Pages, objectNM ? objectNM : ''));
            }
            await vscode.workspace.applyEdit(wsedit);
            vscode.workspace.saveAll();
            vscode.window.showInformationMessage('Create a normal lwc');
            return ['', itemname];
        }
    }
    else {
        let options = {
            prompt: "Label: ",
            placeHolder: "Please input the name of parameter to pass the value"
        };
        let fieldname = await vscode.window.showInputBox(options);
        if (!fieldname)
            return;
        //create a folder
        if (vscode.workspace.workspaceFolders !== undefined) {
            const wsPath = vscode.workspace.workspaceFolders[0].uri.path; // gets the path of the first workspace folder
            const wsedit = new vscode.WorkspaceEdit();
            const filePath = vscode.Uri.file(wsPath + '/messageChannels/' + itemname + '.messageChannel-meta.xml');
            vscode.window.showInformationMessage(filePath.toString());
            wsedit.createFile(filePath, { ignoreIfExists: true });
            let LMS_temp = new LMS_1.LMSChannel();
            wsedit.insert(filePath, new vscode.Position(0, 0), LMS_temp.makeChannel(fieldname));
            await vscode.workspace.applyEdit(wsedit);
            vscode.workspace.saveAll();
            vscode.window.showInformationMessage('Create a channel');
        }
        return [fieldname, itemname];
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map