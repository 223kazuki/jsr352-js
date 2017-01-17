'use strict';

var initialDiagram =
'<?xml version="1.0" encoding="UTF-8"?>' +
'<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:jsr352="http://jsr352/" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">' +
'  <jsr352:job id="Job_1" bpmn:name="aaaa" isExecutable="false">' +
'    <jsr352:start id="Start_1">' +
'      <bpmn:outgoing>Transition_1hi11xl</bpmn:outgoing>' +
'    </jsr352:start>' +
'    <jsr352:step id="Step_1nlb2kj">' +
'      <bpmn:incoming>Transition_1hi11xl</bpmn:incoming>' +
'      <jsr352:batchlet id="Batchlet_0luryks" name="aaaa">' +
'        <bpmn:documentation>adsfaedsfasdf</bpmn:documentation>' +
'      </jsr352:batchlet>' +
'      <jsr352:batchlet id="Batchlet_1setntg">' +
'        <bpmn:documentation>aaaa</bpmn:documentation>' +
'      </jsr352:batchlet>' +
'    </jsr352:step>' +
'    <jsr352:transition id="Transition_1hi11xl" sourceRef="Start_1" targetRef="Step_1nlb2kj" />' +
'  </jsr352:job>' +
'  <bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
'    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Job_1">' +
'      <bpmndi:BPMNShape id="_BPMNShape_Start_2" bpmnElement="Start_1">' +
'        <dc:Bounds x="173" y="102" width="36" height="36" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id="Step_1nlb2kj_di" bpmnElement="Step_1nlb2kj" isExpanded="true">' +
'        <dc:Bounds x="191" y="284" width="223" height="100" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNEdge id="Transition_1hi11xl_di" bpmnElement="Transition_1hi11xl">' +
'        <di:waypoint xsi:type="dc:Point" x="213" y="122" />' +
'        <di:waypoint xsi:type="dc:Point" x="303" y="122" />' +
'        <di:waypoint xsi:type="dc:Point" x="303" y="284" />' +
'        <bpmndi:BPMNLabel>' +
'          <dc:Bounds x="258" y="107" width="0" height="0" />' +
'        </bpmndi:BPMNLabel>' +
'      </bpmndi:BPMNEdge>' +
'      <bpmndi:BPMNShape id="Batchlet_1setntg_di" bpmnElement="Batchlet_1setntg">' +
'        <dc:Bounds x="352" y="240" width="100" height="80" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id="Batchlet_0pwuo31_di">' +
'        <dc:Bounds x="412" y="297" width="100" height="80" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id="Batchlet_1m95eyl_di" bpmnElement="Batchlet_1m95eyl">' +
'        <dc:Bounds x="394" y="290" width="100" height="80" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id="Batchlet_0luryks_di" bpmnElement="Batchlet_0luryks">' +
'        <dc:Bounds x="291" y="296" width="100" height="80" />' +
'      </bpmndi:BPMNShape>' +
'    </bpmndi:BPMNPlane>' +
'  </bpmndi:BPMNDiagram>' +
'</bpmn:definitions>';

var JSR352Modeler = require('./jsr352-modeler');
var $ = require('jquery');

var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('./jsr352-properties-panel/provider'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda'),
    jsr352ModdleDescriptor = require('./descriptors/jsr352');


var modeler = new JSR352Modeler({
  container: '#canvas',
  keyboard: { bindTo: document },
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    jsr352: jsr352ModdleDescriptor,
    camunda: camundaModdleDescriptor
  }
});

modeler.importXML(initialDiagram, function(err) {
  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');
});

function saveSVG(done) {
  modeler.saveSVG(done);
}

function saveDiagram(done) {

  modeler.saveXML({ format: true }, function(err, xml) {
    done(err, xml);
  });
}
$(document).on('ready', function() {

  $('#js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    createNewDiagram();
  });

  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  var _ = require('lodash');

  var exportArtifacts = _.debounce(function() {
    saveSVG(function(err, svg) {
      setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
    });

    saveDiagram(function(err, xml) {
      setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
    });
  }, 500);

  modeler.on('commandStack.changed', exportArtifacts);
});

// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
