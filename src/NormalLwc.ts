import * as vscode from 'vscode';


export class NormalLWC {

     makeHtmlcode() {
        const Htmlcode ='<template>'+'\n'+
                            '<lightning-card>'+'\n'+
                            '\n'+
                            '</lightning-card>'+'\n'+
                        '</template>';
        return Htmlcode;
    }
 
    makeJScode(lwcname : string) {
        const JScode ='import { LightningElement, api } from \'lwc\';'+'\n'+
                        '//import apexMethodName from \'@salesforce/apex/Classname.apexMethod\';'+'\n'+
                        'import { ShowToastEvent } from \'lightning/platformShowToastEvent\';'+'\n'+
                        '\n'+
                        '\n'+
                        'export default class '+ lwcname +' extends LightningElement {'+'\n'+
                        '\n'+
                        '\n'+
                        '\t//initialization(初期化):Called when the element is inserted into a document'+'\n'+
                        '\tconnectedCallback() {'+'\n'+
                        '\n'+
                        '\t}'+
                        '\n'+
                        '\t//For overwrite(UIがloading済なので、ここで上書き):Called after every render of the component'+'\n'+
                        '\trenderedCallback() {'+'\n'+
                        '\n'+
                        '\t}'+
                        '\n'+
                        '\t//Show error message or success message etc'+'\n'+
                        '\t//variant : Valid values are: info (default), success, warning, and error'+'\n'+
                        '\t//example:this.showMessage(\'create\',\'you create a record\',\'success\');'+'\n'+
                        '\tshowMessage(stitle,smessage,svariant) {'+'\n'+
                        '\t\tthis.dispatchEvent('+'\n'+
                        '\t\t\tnew ShowToastEvent({'+'\n'+
                        '\t\t\t\ttitle: stitle,'+'\n'+
                        '\t\t\t\tmessage: smessage,'+'\n'+
                        '\t\t\t\tvariant: svariant'+'\n'+
                        '\t\t\t})'+'\n'+
                        '\t\t);'+'\n'+
                        '\t}'+
                        '\n'+
                        '}';
        return JScode;
    }


    makeXMLcode(lwcname : string, xml_Pages: string[],objectNM:string) {
        let XMLcode ='<?xml version="1.0" encoding="UTF-8" ?>'+'\n'+
                        '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">'+'\n'+
                        '\t<apiVersion>55.0</apiVersion>'+'\n'+
                        '\t<isExposed>true</isExposed>'+'\n'+
                        '\t<masterLabel>' + lwcname + '</masterLabel>'+'\n';
                        if (xml_Pages.length !== 0) {
                            XMLcode = XMLcode +'\t<targets>'+'\n';
                            if(xml_Pages.includes('RecordPage')){
                                XMLcode = XMLcode +  '\t\t<target>lightning__RecordPage</target>'+'\n';
                            }
                            if(xml_Pages.includes('AppPage')){
                                XMLcode = XMLcode +  '\t\t<target>lightning__AppPage</target>'+'\n';
                            }
                            if(xml_Pages.includes('HomePage')){
                                XMLcode = XMLcode +  '\t\t<target>lightning__HomePage</target>'+'\n';
                            }
                            if(xml_Pages.includes('Community')){
                                XMLcode = XMLcode +  '\t\t<target>lightningCommunity__Page</target>'+'\n';
                            }
                            XMLcode = XMLcode +'\t</targets>'+'\n';
                        }
                        if(objectNM !== null && objectNM !== ''){
                            XMLcode = XMLcode +  '\t<targetConfigs>'+'\n';
                            XMLcode = XMLcode +  '\t<targetConfig targets="lightning__RecordPage">'+'\n';
                            XMLcode = XMLcode +  '\t    <objects>'+'\n';
                            XMLcode = XMLcode +  '\t        <object>'+ objectNM +'</object>'+'\n';
                            XMLcode = XMLcode +  '\t    </objects>'+'\n';
                            XMLcode = XMLcode +  '\t</targetConfig>'+'\n';
                            XMLcode = XMLcode +  '\t</targetConfigs>'+'\n';
                        }
            XMLcode = XMLcode +'</LightningComponentBundle>';
        return XMLcode;
    }

}