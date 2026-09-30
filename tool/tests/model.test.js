'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('../model.js');
test('JSON round trip preserves every review field and feature', () => {
  const review = M.example();
  review.payment = '不适用\n未知';
  assert.deepEqual(M.normalize(JSON.parse(JSON.stringify(review))),review);
});
test('deferred or removed core generates a contract warning', () => {
  for (const decision of ['Defer','Remove']) {
    const review = M.example(); review.features[0].decision = decision;
    assert.ok(M.inspect(review).some(note => note.includes('被标为核心')));
  }
  const review = M.example(); review.features[0].decision = 'Simplify';
  assert.ok(!M.inspect(review).some(note => note.includes('被标为核心')));
});
test('kept feature needs evidence, signal and ownership cost', () => {
  const review = M.example(); review.features[0].cost = '';
  assert.ok(M.inspect(review).some(note => note.includes('建设及维护成本')));
});
test('invalid JSON shape, decision, boolean or size cannot be imported', () => {
  assert.throws(() => M.normalize({schemaVersion:2}));
  assert.throws(() => M.normalize(null));
  const review = M.example(); review.features[0].decision = 'Approved';
  assert.throws(() => M.normalize(review));
  review.features[0].decision = 'Keep'; review.features[0].core = 'false';
  assert.throws(() => M.normalize(review));
  review.features[0].core = true; review.features = Array(61).fill(review.features[0]);
  assert.throws(() => M.normalize(review));
});
test('Markdown escapes table pipes and preserves multiline content', () => {
  const review = M.example(); review.features[0].reason = '条件 A | B\n第二行';
  const report = M.markdown(review);
  assert.ok(report.includes('条件 A \\| B<br>第二行'));
  assert.ok(report.includes(review.evidence));
  assert.ok(report.includes(review.core));
});
test('empty review reports missing evidence and complete core', () => {
  const notes = M.inspect(M.empty());
  assert.ok(notes.some(note => note.includes('证据')));
  assert.ok(notes.some(note => note.includes('完整流程')));
});
