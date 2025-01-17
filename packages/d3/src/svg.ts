/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Chart,
	SVGMark,
	PlotArea,
	Circle,
	Rect,
	Area,
	Line,
	Arc,
	Node,
	Link,
	Text,
} from '@thematic/core'
import { Selection } from 'd3-selection'

export function svg(
	selection: Selection<Element, any, Element, any>,
	child: Chart,
): Selection<Element, any, Element, any> {
	return selection.attr('fill', child.backgroundColor().hex())
}

/**
 * Apply base mark props from theme child block.
 * @param selection
 * @param child
 */
function mark(
	selection: Selection<Element, any, Element, any>,
	child: SVGMark,
): Selection<Element, any, Element, any> {
	return selection
		.attr('fill', d => child.fill(d).hex())
		.attr('fill-opacity', d => child.fillOpacity(d))
		.attr('stroke', d => child.stroke(d).hex())
		.attr('stroke-opacity', d => child.strokeOpacity(d))
		.attr('stroke-width', d => child.strokeWidth(d))
}

/**
 * Apply props for rect-based marks to a selection.
 * @param selection
 * @param child
 */
export function rect(
	selection: Selection<Element, any, Element, any>,
	child: Rect | PlotArea,
): Selection<Element, any, Element, any> {
	return selection.call(mark, child)
}

/**
 * Apply props for circle-based marks to a selection.
 * @param selection
 * @param child
 */
export function circle(
	selection: Selection<Element, any, Element, any>,
	child: Circle | Node,
): Selection<Element, any, Element, any> {
	return selection.attr('r', d => child.radius(d)).call(mark, child)
}

/**
 * Apply props for line-based marks to a selection.
 * @param selection
 * @param child
 */
export function line(
	selection: Selection<Element, any, Element, any>,
	child: Line | Link,
): Selection<Element, any, Element, any> {
	return selection.call(mark, child)
}

/**
 * Applt props for text-based marks to a selection.
 * @param selection
 * @param child
 */
export function text(
	selection: Selection<Element, any, Element, any>,
	child: Text,
): Selection<Element, any, Element, any> {
	return selection
		.attr('font-size', child.fontSize())
		.attr('font-family', child.fontFamily())
		.call(mark, child)
}

/**
 * Apply props for path-based marks to a selection.
 * @param selection
 * @param child
 */
export function path(
	selection: Selection<Element, any, Element, any>,
	child: Area | Arc,
): Selection<Element, any, Element, any> {
	return selection.call(mark, child)
}
