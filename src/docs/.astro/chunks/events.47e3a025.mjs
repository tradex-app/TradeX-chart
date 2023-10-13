import { i as createVNode, F as Fragment, s as spreadAttributes } from './astro.7b6fbd1f.mjs';
import '@astrojs/internal-helpers/path';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './pages/404.astro.1d69ba63.mjs';
import 'html-escaper';
import 'fs';
import 'path';
/* empty css                        */import 'zod';
/* empty css                                                             */import 'execa';

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>TradeX-chart provides a publish and subscribe messaging model. The chart supports multiple subscriptions to an event.</p>\n<p>It is also possible to use the chart to generate your on events.</p>\n<h2 id=\"subscribing\">Subscribing</h2>\n<p>Once the chart is initialized with the <code>chart.start()</code> method, any event the chart generates can be subscribed to with the <code>chart.on(topic, handler)</code> method.</p>\n<ul>\n<li>@param {string}   topic   - event name</li>\n<li>@param {function} handler - function or method</li>\n<li>@param {Object}   context - Optional context the function belongs to</li>\n</ul>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart</span><span style=\"color: #B392F0\">.on(</span><span style=\"color: #FFAB70\">\"stream_candleUpdate\"</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> onSomeEven</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">)</span></span></code></pre>\n<p>The handler will be passed one parameter if any dependent upon the event.</p>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #F97583\">function</span><span style=\"color: #B392F0\"> onSomeEvent(data) { </span><span style=\"color: #79B8FF\">console</span><span style=\"color: #B392F0\">.log(data) }</span></span></code></pre>\n<p>Event handlers will be executed in first in last out order.</p>\n<h2 id=\"unsubscribing\">Unsubscribing</h2>\n<p>Unsubscribing from the event uses the <code>chart.off(string, function)</code> method.</p>\n<ul>\n<li>@param {string}   topic   - event name</li>\n<li>@param {function} handler - function or method</li>\n</ul>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart</span><span style=\"color: #B392F0\">.off(</span><span style=\"color: #FFAB70\">\"stream_candleUpdate\"</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> onSomeEven)</span></span></code></pre>\n<h2 id=\"event-publishing\">Event Publishing</h2>\n<p>The same method that the chart uses internally is also exposed on the public API. Developers can take advantage of this for their own purposes and generate their own events and use the same subscribe and unsubscribe methods detailed above.</p>\n<ul>\n<li>@param {String} topic - The topic name</li>\n<li>@param {Object} data  - The data to publish</li>\n</ul>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #79B8FF\">chart</span><span style=\"color: #B392F0\">.emit(</span><span style=\"color: #FFAB70\">\"some_event\"</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> {value</span><span style=\"color: #F97583\">:</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">\"foo\"</span><span style=\"color: #B392F0\">})</span></span></code></pre>\n<h2 id=\"event-list\">Event List</h2>\n<p>The following list of events is not exhaustive as the chart is still under heavy development and subject to change until the release of version 1.0.</p>\n<ul>\n<li>addIndicatorDone</li>\n<li>addSecondary</li>\n<li>chart_pan</li>\n<li>chart_panDone</li>\n<li>chart_render</li>\n<li>chart_yAxisRedraw</li>\n<li>divider_pointerdrag</li>\n<li>divider_pointerdragend</li>\n<li>Error</li>\n<li>event_selected</li>\n<li>global_resize</li>\n<li>main_mousemove</li>\n<li>scrollUpdate</li>\n<li>setRange</li>\n<li>trade_selected</li>\n<li>zoomDone</li>\n</ul>");

				const frontmatter = {"title":"Events"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/events.md";
				const url = undefined;
				function rawContent() {
					return "\nTradeX-chart provides a publish and subscribe messaging model. The chart supports multiple subscriptions to an event.\n\nIt is also possible to use the chart to generate your on events.\n\n## Subscribing\n\nOnce the chart is initialized with the ``chart.start()`` method, any event the chart generates can be subscribed to with the ``chart.on(topic, handler)`` method.\n\n* @param {string}   topic   - event name\n* @param {function} handler - function or method\n* @param {Object}   context - Optional context the function belongs to\n\n```javascript\nchart.on(\"stream_candleUpdate\", onSomeEven, this)\n```\n\nThe handler will be passed one parameter if any dependent upon the event.\n\n```javascript\nfunction onSomeEvent(data) { console.log(data) }\n```\nEvent handlers will be executed in first in last out order.\n\n## Unsubscribing\n\nUnsubscribing from the event uses the ``chart.off(string, function)`` method.\n\n* @param {string}   topic   - event name\n* @param {function} handler - function or method\n\n```javascript\nchart.off(\"stream_candleUpdate\", onSomeEven)\n```\n\n## Event Publishing\n\nThe same method that the chart uses internally is also exposed on the public API. Developers can take advantage of this for their own purposes and generate their own events and use the same subscribe and unsubscribe methods detailed above.\n\n* @param {String} topic - The topic name\n* @param {Object} data  - The data to publish\n\n```javascript\nchart.emit(\"some_event\", {value: \"foo\"})\n```\n\n## Event List\n\nThe following list of events is not exhaustive as the chart is still under heavy development and subject to change until the release of version 1.0.\n\n* addIndicatorDone\n* addSecondary\n* chart_pan\n* chart_panDone\n* chart_render\n* chart_yAxisRedraw\n* divider_pointerdrag\n* divider_pointerdragend\n* Error\n* event_selected\n* global_resize\n* main_mousemove\n* scrollUpdate\n* setRange\n* trade_selected\n* zoomDone\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"subscribing","text":"Subscribing"},{"depth":2,"slug":"unsubscribing","text":"Unsubscribing"},{"depth":2,"slug":"event-publishing","text":"Event Publishing"},{"depth":2,"slug":"event-list","text":"Event List"}];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
