export class SUBLMS {

     makeSubHtml() {
        const Htmlcode ='<template>'+'\n'+
                            '<lightning-card>'+'\n'+
                            '\t<h2>here is the passed value</h2>'+'\n'+
                            '\t<p class="slds-p-horizontal_small">'+'\n'+
                            '\t\t<lightning-input type="text" value={acceptedValue} read-only="true"></lightning-input>'+'\n'+
                            '\t</p>'+'\n'+
                            '</lightning-card>'+'\n'+
                        '</template>';
        return Htmlcode;
    }
 
    makeSubJS(lwcname : string,channelname : string,fieldName : string) {
        const JScode ='import { api,wire,LightningElement }from \'lwc\';'+'\n'+
                        '//import apexMethodName from \'@salesforce/apex/Classname.apexMethod\';'+'\n'+
                        'import { subscribe, MessageContext } from \'lightning/messageService\';'+'\n'+
                        'import '+channelname+'Channel from \'@salesforce/messageChannel/'+ channelname +'__c\';'+'\n'+
                        '\n'+
                        '\n'+
                        'export default class '+ lwcname +' extends LightningElement {'+'\n'+
                        '\n'+
                        '\t@api acceptedValue;'+'\n'+
                        '\t@wire(MessageContext)'+'\n'+
                        '\tmessageContext;'+'\n'+
                        '\t//initialization(初期化):Called when the element is inserted into a document'+'\n'+
                        '\tconnectedCallback() {'+'\n'+
                        '\t\tthis.handleSubscribe();'+'\n'+
                        '\t}'+
                        '\n'+
                        '\t//For overwrite(UIがloading済なので、ここで上書き):Called after every render of the component'+'\n'+
                        '\trenderedCallback() {'+'\n'+
                        '\n'+
                        '\t}'+
                        '\n'+
                        '\thandleSubscribe() {'+'\n'+
                        '    this.designDocSubscription = subscribe(this.messageContext, '+channelname+'Channel, (message) => {'+'\n'+
                        '      if (message.'+fieldName+' != undefined) {'+'\n'+
                        '       this.acceptedValue = message.'+fieldName+';'+'\n'+
                        '      }'+'\n'+
                        '      if (message.forceRefresh && this.cacheData) {'+'\n'+
                        '        refreshApex(this.cacheData);'+'\n'+
                        '      }'+'\n'+
                        '    });'+'\n'+
                        '  }'+'\n'+
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
                            XMLcode = XMLcode +  '\t/targetConfigs>'+'\n';
                        }
            XMLcode = XMLcode +'</LightningComponentBundle>';
        return XMLcode;
    }

}



export class PUBLMS {

    makePubHtml() {
       const Htmlcode ='<template>'+'\n'+
                           '\t<lightning-card>'+'\n'+
                           '\t<h2>press enter key to execute</h2>'+'\n'+
                           '\t<p class="slds-p-horizontal_small">'+'\n'+
                           '\t\t<lightning-input type="text" onkeyup ={handlePublish} value={sendValue} label="Input some text pass to other lwc by lms"></lightning-input>'+'\n'+
                           '\t</p>'+'\n'+
                           '</lightning-card>'+'\n'+
                       '</template>';
       return Htmlcode;
   }

   makePubJS(lwcname : string,channelname : string,fieldName : string) {
       const JScode ='import { api,wire,LightningElement }from \'lwc\';'+'\n'+
                       '//import apexMethodName from \'@salesforce/apex/Classname.apexMethod\';'+'\n'+
                       'import { publish, MessageContext } from \'lightning/messageService\';'+'\n'+
                       'import '+channelname+'Channel from \'@salesforce/messageChannel/'+ channelname +'__c\';'+'\n'+
                       '\n'+
                       '\n'+
                       'export default class '+ lwcname +' extends LightningElement {'+'\n'+
                       '\n'+
                       '\t@api sendValue;'+'\n'+
                       '\t@wire(MessageContext)'+'\n'+
                       '\tmessageContext;'+'\n'+
                       '\t//initialization(初期化):Called when the element is inserted into a document'+'\n'+
                       '\tconnectedCallback() {'+'\n'+
                       '\t\t//publish(this.messageContext, '+channelname+'Channel, { '+fieldName+': 12}); //you can also do publish in here'+'\n'+
                       '\t}'+
                       '\n'+
                       '\t//For overwrite(UIがloading済なので、ここで上書き):Called after every render of the component'+'\n'+
                       '\trenderedCallback() {'+'\n'+
                       '\n'+
                       '\t}'+
                       '\n'+
                       '\thandlePublish(event) {'+'\n'+
                       '\t    if (event.keyCode === 13) { '+'\n'+
                       '\t      publish(this.messageContext, '+channelname+'Channel, { '+fieldName+': event.target.value});'+'\n'+
                       '\t     };'+'\n'+
                       '\t  }'+'\n'+
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
                           XMLcode = XMLcode +  '\t/targetConfigs>'+'\n';
                       }
           XMLcode = XMLcode +'</LightningComponentBundle>';
       return XMLcode;
   }

}

export class LMSChannel {
        makeChannel(fieldName : string) {
            const Channelcode ='<?xml version="1.0" encoding="UTF-8"?>'+'\n'+
                                '<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">'+'\n'+
                                '\t<description>pass value from one lwc to another</description>'+'\n'+
                                '\t<isExposed>true</isExposed>'+'\n'+
                                '\t<lightningMessageFields>'+'\n'+
                                '\t\t<description>descript what do you want to use for </description>'+'\n'+
                                '\t\t<fieldName>' + fieldName + '</fieldName>'+'\n'+
                                '\t</lightningMessageFields>'+'\n'+
                                '\t<masterLabel>test Message Channel</masterLabel>'+'\n'+
                                '</LightningMessageChannel>';
            return Channelcode;
}
}