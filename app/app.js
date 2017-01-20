'use strict';

var initialDiagram =
'<?xml version=\"1.0\" encoding=\"UTF-8\"?>' +
'<bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:jsr352=\"http://jsr352/\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" id=\"Definitions_1\" targetNamespace=\"http://bpmn.io/schema/bpmn\">' +
'  <jsr352:job id=\"Job_1\" bpmn:name=\"test2\" isExecutable=\"false\">' +
'    <jsr352:start id=\"Start_1\">' +
'      <bpmn:outgoing>Transition_0wr09xv</bpmn:outgoing>' +
'    </jsr352:start>' +
'    <jsr352:step id=\"Step_0pmvg23\">' +
'      <bpmn:incoming>Transition_0wr09xv</bpmn:incoming>' +
'      <bpmn:outgoing>Transition_14082kv</bpmn:outgoing>' +
'      <jsr352:batchlet id=\"Batchlet_1e0j5a9\" />' +
'    </jsr352:step>' +
'    <jsr352:transition id=\"Transition_0wr09xv\" sourceRef=\"Start_1\" targetRef=\"Step_0pmvg23\" />' +
'    <jsr352:step id=\"Step_1qg49sk\">' +
'      <bpmn:incoming>Transition_14082kv</bpmn:incoming>' +
'      <bpmn:outgoing>Transition_1myjkti</bpmn:outgoing>' +
'      <jsr352:batchlet id=\"Batchlet_0l6xlxp\" />' +
'    </jsr352:step>' +
'    <jsr352:transition id=\"Transition_14082kv\" sourceRef=\"Step_0pmvg23\" targetRef=\"Step_1qg49sk\" />' +
'    <jsr352:step id=\"Step_1ws93bk\">' +
'      <bpmn:incoming>Transition_1myjkti</bpmn:incoming>' +
'      <jsr352:listener id=\"Listener_0qzo9us\" />' +
'      <jsr352:chunk id=\"Chunk_0clz8rp\" name=\"test\" />' +
'    </jsr352:step>' +
'    <jsr352:transition id=\"Transition_1myjkti\" sourceRef=\"Step_1qg49sk\" targetRef=\"Step_1ws93bk\" />' +
'  </jsr352:job>' +
'  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">' +
'    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Job_1\">' +
'      <bpmndi:BPMNShape id=\"_BPMNShape_Start_2\" bpmnElement=\"Start_1\">' +
'        <dc:Bounds x=\"173\" y=\"102\" width=\"36\" height=\"36\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id=\"Step_0pmvg23_di\" bpmnElement=\"Step_0pmvg23\" isExpanded=\"true\">' +
'        <dc:Bounds x=\"299\" y=\"78\" width=\"210\" height=\"144\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNEdge id=\"Transition_0wr09xv_di\" bpmnElement=\"Transition_0wr09xv\">' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"209\" y=\"120\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"254\" y=\"120\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"254\" y=\"150\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"299\" y=\"150\" />' +
'        <bpmndi:BPMNLabel>' +
'          <dc:Bounds x=\"269\" y=\"135\" width=\"0\" height=\"0\" />' +
'        </bpmndi:BPMNLabel>' +
'      </bpmndi:BPMNEdge>' +
'      <bpmndi:BPMNShape id=\"Batchlet_1e0j5a9_di\" bpmnElement=\"Batchlet_1e0j5a9\">' +
'        <dc:Bounds x=\"320\" y=\"98\" width=\"100\" height=\"80\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id=\"Step_1qg49sk_di\" bpmnElement=\"Step_1qg49sk\" isExpanded=\"true\">' +
'        <dc:Bounds x=\"172\" y=\"305\" width=\"228\" height=\"129\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNEdge id=\"Transition_14082kv_di\" bpmnElement=\"Transition_14082kv\">' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"404\" y=\"222\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"404\" y=\"265\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"286\" y=\"265\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"286\" y=\"305\" />' +
'        <bpmndi:BPMNLabel>' +
'          <dc:Bounds x=\"345\" y=\"250\" width=\"0\" height=\"0\" />' +
'        </bpmndi:BPMNLabel>' +
'      </bpmndi:BPMNEdge>' +
'      <bpmndi:BPMNShape id=\"Batchlet_0l6xlxp_di\" bpmnElement=\"Batchlet_0l6xlxp\">' +
'        <dc:Bounds x=\"194\" y=\"325\" width=\"100\" height=\"80\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id=\"Step_1ws93bk_di\" bpmnElement=\"Step_1ws93bk\" isExpanded=\"true\">' +
'        <dc:Bounds x=\"439\" y=\"320\" width=\"323.4000000000001\" height=\"100\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNEdge id=\"Transition_1myjkti_di\" bpmnElement=\"Transition_1myjkti\">' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"400\" y=\"370\" />' +
'        <di:waypoint xsi:type=\"dc:Point\" x=\"439\" y=\"370\" />' +
'        <bpmndi:BPMNLabel>' +
'          <dc:Bounds x=\"420\" y=\"355\" width=\"0\" height=\"0\" />' +
'        </bpmndi:BPMNLabel>' +
'      </bpmndi:BPMNEdge>' +
'      <bpmndi:BPMNShape id=\"Listener_0qzo9us_di\" bpmnElement=\"Listener_0qzo9us\">' +
'        <dc:Bounds x=\"465\" y=\"365\" width=\"80\" height=\"20\" />' +
'      </bpmndi:BPMNShape>' +
'      <bpmndi:BPMNShape id=\"Chunk_0clz8rp_di\" bpmnElement=\"Chunk_0clz8rp\">' +
'        <dc:Bounds x=\"562.4000000000001\" y=\"335\" width=\"100\" height=\"80\" />' +
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
