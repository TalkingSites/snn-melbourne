// This site's SpaceDash block: the whole day map. Its content is edited in
// Settings > Programme (src/_data/day.json), so the block itself has no fields.
(function () {
  var blocks = [
    { id: "conferenceDay", label: "Conference day map", file: "conferenceDay" },
  ];
  blocks.forEach(function (b) {
    var include = '{% include "partials/' + b.file + '.njk" %}';
    window.CMS.registerEditorComponent({
      id: "site-" + b.id,
      label: b.label,
      fields: [{ name: "note", label: "Edit the sessions in Settings > Programme", widget: "hidden", required: false }],
      collapsed: true,
      pattern: new RegExp('^{%\\s*include\\s+"partials/' + b.file + '\\.njk"\\s*%}'),
      fromBlock: function () { return {}; },
      toBlock: function () { return include; },
      toPreview: function () { return "<strong>" + b.label + "</strong>"; },
    });
  });
})();
