"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LMSChannel = exports.CHILD = exports.Parent = void 0;
class Parent {
    makeParentHtml(childLWCname) {
        //childLWCname need to be lowercase
        const Htmlcode = '<template>' + '\n' +
            '\t<lightning-card>' + '\n' +
            '\t<h2>parent lwc</h2>' + '\n' +
            '\t<p class="slds-p-horizontal_small">' + '\n' +
            '\t\t<c-' + childLWCname + ' child-value={value1}  lowercasevalue={value2} oncumtomeventname={CalledFromChild}></c-samplechild>' + '\n' +
            '\t\t<lightning-button variant="brand" label="call child" onclick={parentFunc}>' + '\n' +
            '\t</p>' + '\n' +
            '\t</lightning-card>' + '\n' +
            '</template>';
        return Htmlcode;
    }
    makeParentJS(lwcname, childLWCname) {
        const JScode = 'import { api,LightningElement }from \'lwc\';' + '\n' +
            '//import apexMethodName from \'@salesforce/apex/Classname.apexMethod\';' + '\n' +
            '\n' +
            '\n' +
            'export default class ' + lwcname + ' extends LightningElement {' + '\n' +
            '\n' +
            '\t@api value1 = \'click here pass value from parent to child\';' + '\n' +
            '\t@api value2 = \'this value is from parent\';' + '\n' +
            '\t//initialization(初期化):Called when the element is inserted into a document' + '\n' +
            '\tconnectedCallback() {' + '\n' +
            '\t\tthis.handleSubscribe();' + '\n' +
            '\t}' +
            '\n' +
            '\t//For overwrite(UIがloading済なので、ここで上書き):Called after every render of the component' + '\n' +
            '\trenderedCallback() {' + '\n' +
            '\n' +
            '\t}' +
            '\n' +
            '\tCalledFromChild(event) {' + '\n' +
            '\t    alert(\'you call here from child\');' + '\n' +
            '\t}' + '\n' +
            '\n' +
            '\tparentFunc(){' + '\n' +
            '\t    this.template.querySelector("c-' + childLWCname + '").childFunc();' + '\n' +
            '\t  }' + '\n' +
            '\n' +
            '}';
        return JScode;
    }
    makeXMLcode(lwcname, xml_Pages, objectNM) {
        let XMLcode = '<?xml version="1.0" encoding="UTF-8" ?>' + '\n' +
            '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">' + '\n' +
            '\t<apiVersion>55.0</apiVersion>' + '\n' +
            '\t<isExposed>true</isExposed>' + '\n' +
            '\t<masterLabel>' + lwcname + '</masterLabel>' + '\n';
        if (xml_Pages.length !== 0) {
            XMLcode = XMLcode + '\t<targets>' + '\n';
            if (xml_Pages.includes('RecordPage')) {
                XMLcode = XMLcode + '\t\t<target>lightning__RecordPage</target>' + '\n';
            }
            if (xml_Pages.includes('AppPage')) {
                XMLcode = XMLcode + '\t\t<target>lightning__AppPage</target>' + '\n';
            }
            if (xml_Pages.includes('HomePage')) {
                XMLcode = XMLcode + '\t\t<target>lightning__HomePage</target>' + '\n';
            }
            if (xml_Pages.includes('Community')) {
                XMLcode = XMLcode + '\t\t<target>lightningCommunity__Page</target>' + '\n';
            }
            XMLcode = XMLcode + '\t</targets>' + '\n';
        }
        if (objectNM !== null && objectNM !== '') {
            XMLcode = XMLcode + '\t<targetConfigs>' + '\n';
            XMLcode = XMLcode + '\t<targetConfig targets="lightning__RecordPage">' + '\n';
            XMLcode = XMLcode + '\t    <objects>' + '\n';
            XMLcode = XMLcode + '\t        <object>' + objectNM + '</object>' + '\n';
            XMLcode = XMLcode + '\t    </objects>' + '\n';
            XMLcode = XMLcode + '\t</targetConfig>' + '\n';
            XMLcode = XMLcode + '\t/targetConfigs>' + '\n';
        }
        XMLcode = XMLcode + '</LightningComponentBundle>';
        return XMLcode;
    }
}
exports.Parent = Parent;
class CHILD {
    makeCHILDHtml() {
        const Htmlcode = '<template>' + '\n' +
            '\t<lightning-card>' + '\n' +
            '\t<h2>child lwc</h2>' + '\n' +
            '\t<p class="slds-p-horizontal_small">' + '\n' +
            '\t\t<a href="#" onclick={callparent}>{childValue}</a>' + '\n' +
            '\t\t<br/>' + '\n' +
            '\t\t{lowercasevalue}' + '\n' +
            '\t</p>' + '\n' +
            '\t</lightning-card>' + '\n' +
            '</template>';
        return Htmlcode;
    }
    makeCHILDJS(lwcname) {
        const JScode = 'import { api,LightningElement }from \'lwc\';' + '\n' +
            '//import apexMethodName from \'@salesforce/apex/Classname.apexMethod\';' + '\n' +
            '\n' +
            '\n' +
            'export default class ' + lwcname + ' extends LightningElement {' + '\n' +
            '\n' +
            '\t//you can give the value from parentLWC to this para(childValue),see child-value(all should be lowercase) in parent html' + '\n' +
            '\t@api childValue;//when capital letter exists' + '\n' +
            '\t@api lowercasevalue;//all is lowercase' + '\n' +
            '\t//initialization(初期化):Called when the element is inserted into a document' + '\n' +
            '\tconnectedCallback() {' + '\n' +
            '\n' +
            '\t}' +
            '\n' +
            '\t//For overwrite(UIがloading済なので、ここで上書き):Called after every render of the component' + '\n' +
            '\trenderedCallback() {' + '\n' +
            '\n' +
            '\t}' +
            '\n' +
            '\t@api ' + '\n' +
            '\tchildFunc(){' + '\n' +
            '\t\t//you can call this func from parent' + '\n' +
            '\t}' + '\n' +
            '\tcallparent(event){ ' + '\n' +
            '\t\tconst selectedEvent = new CustomEvent(\'cumtomeventname\', { parameterName: \'123\' });' + '\n' +
            '\t\tthis.dispatchEvent(selectedEvent);' + '\n' +
            '\t}' + '\n' +
            '\n' +
            '}';
        return JScode;
    }
    makeXMLcode(lwcname, xml_Pages, objectNM) {
        let XMLcode = '<?xml version="1.0" encoding="UTF-8" ?>' + '\n' +
            '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">' + '\n' +
            '\t<apiVersion>55.0</apiVersion>' + '\n' +
            '\t<isExposed>true</isExposed>' + '\n' +
            '\t<masterLabel>' + lwcname + '</masterLabel>' + '\n';
        if (xml_Pages.length !== 0) {
            XMLcode = XMLcode + '\t<targets>' + '\n';
            if (xml_Pages.includes('RecordPage')) {
                XMLcode = XMLcode + '\t\t<target>lightning__RecordPage</target>' + '\n';
            }
            if (xml_Pages.includes('AppPage')) {
                XMLcode = XMLcode + '\t\t<target>lightning__AppPage</target>' + '\n';
            }
            if (xml_Pages.includes('HomePage')) {
                XMLcode = XMLcode + '\t\t<target>lightning__HomePage</target>' + '\n';
            }
            if (xml_Pages.includes('Community')) {
                XMLcode = XMLcode + '\t\t<target>lightningCommunity__Page</target>' + '\n';
            }
            XMLcode = XMLcode + '\t</targets>' + '\n';
        }
        if (objectNM !== null && objectNM !== '') {
            XMLcode = XMLcode + '\t<targetConfigs>' + '\n';
            XMLcode = XMLcode + '\t<targetConfig targets="lightning__RecordPage">' + '\n';
            XMLcode = XMLcode + '\t    <objects>' + '\n';
            XMLcode = XMLcode + '\t        <object>' + objectNM + '</object>' + '\n';
            XMLcode = XMLcode + '\t    </objects>' + '\n';
            XMLcode = XMLcode + '\t</targetConfig>' + '\n';
            XMLcode = XMLcode + '\t/targetConfigs>' + '\n';
        }
        XMLcode = XMLcode + '</LightningComponentBundle>';
        return XMLcode;
    }
}
exports.CHILD = CHILD;
class LMSChannel {
    makeChannel(fieldName) {
        const Channelcode = '<?xml version="1.0" encoding="UTF-8"?>' + '\n' +
            '<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">' + '\n' +
            '\t<description>pass value from one lwc to another</description>' + '\n' +
            '\t<isExposed>true</isExposed>' + '\n' +
            '\t<lightningMessageFields>' + '\n' +
            '\t\t<description>descript what do you want to use for </description>' + '\n' +
            '\t\t<fieldName>' + fieldName + '</fieldName>' + '\n' +
            '\t</lightningMessageFields>' + '\n' +
            '\t<masterLabel>test Message Channel</masterLabel>' + '\n' +
            '</LightningMessageChannel>';
        return Channelcode;
    }
}
exports.LMSChannel = LMSChannel;
//# sourceMappingURL=ParentWithChild.js.map