/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleType, Theme } from '@thematic/core'
import {
	ScaleDropdown,
	ScaleTypeChoiceGroup,
	ColorPicker,
	ColorPickerButton,
} from '@thematic/fluent'
import { useThematic } from '@thematic/react'
import { useState, useCallback, useMemo, FC } from 'react'
import { connect } from 'react-redux'
import { themeLoaded } from '../../state/actions'

export interface FluentControlsComponentProps {
	themeLoaded: (theme: Theme) => void
}

const FluentControlsComponent: FC<FluentControlsComponentProps> = ({
	themeLoaded,
}) => {
	const theme = useThematic()
	const [scale, setScale] = useState<string>('<none>')
	const handleScaleChange = useCallback((e, option) => setScale(option.key), [])
	const [scaleType, setScaleType] = useState<ScaleType>(ScaleType.Linear)
	const handleScaleTypeChange = useCallback(type => setScaleType(type), [])
	const handlePickerChange = useCallback(t => themeLoaded(t), [themeLoaded])
	const labelStyle = useMemo(
		() => ({
			fontWeight: 'bold' as const,
			color: theme.application().accent().hex(),
		}),
		[theme],
	)
	const actionStyle = useMemo(
		() => ({
			fontSize: 12,
			fontFamily: 'monospace',
			color: theme.application().warning().hex(),
		}),
		[theme],
	)
	return (
		<div
			style={{
				fontSize: 14,
				overflowY: 'scroll',
			}}
		>
			<p>
				The @thematic/fluent package contains a few custom Fluent controls you
				can use in your applications to allow Thematic-specific interactions.
			</p>
			<div style={controlsStyle}>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ScaleDropdown:</span> a Dropdown that
						pre-loads Thematic scale options.
					</p>
					<ScaleDropdown
						placeholder={'Choose scale'}
						onChange={handleScaleChange}
					/>
					<p style={actionStyle}> onChange: {scale}</p>
				</div>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ScaleTypeChoiceGroup:</span> a ChoiceGroup
						that pre-loads Thematic scale types.
					</p>
					<ScaleTypeChoiceGroup
						selectedType={scaleType}
						onChange={handleScaleTypeChange}
					/>
					<p style={actionStyle}> onChange: {scaleType}</p>
				</div>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ColorPicker:</span> a ColorPicker that
						emits Thematic parameters.
					</p>
					<ColorPicker theme={theme} onChange={handlePickerChange} />
					<p style={actionStyle}>
						{' '}
						onChange: {theme.application().accent().hex()}
					</p>
				</div>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ColorPickerButton:</span> a DropdownButton
						that hosts a Thematic ColorPicker.
					</p>
					<ColorPickerButton theme={theme} onChange={handlePickerChange} />
					<p style={actionStyle}>
						{' '}
						onChange: {theme.application().accent().hex()}
					</p>
				</div>
			</div>
		</div>
	)
}

export const FluentControls = connect(null, {
	themeLoaded,
})(FluentControlsComponent)

const controlsStyle = {
	display: 'flex' as const,
	flexDirection: 'row' as const,
	flexWrap: 'wrap' as const,
	justifyContent: 'space-around' as const,
}

const controlStyle = {
	width: 320,
	padding: 8,
	margin: 8,
}
