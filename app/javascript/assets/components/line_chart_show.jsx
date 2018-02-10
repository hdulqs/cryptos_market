import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	ScatterSeries,
	SquareMarker,
	LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class LineAndScatterChartGrid extends React.Component {
	render() {
		const { type, data: initialData, width, ratio, interpolation } = this.props;
		const { gridProps } = this.props;
		const margin = { left: 70, right: 70, top: 20, bottom: 30 };

		const height = 600;
		const gridHeight = height - margin.top - margin.bottom;
		const gridWidth = width - margin.left - margin.right;

		const showGrid = false;
		const yGrid = showGrid ? { innerTickSize: -1 * gridWidth } : {};
		const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {};

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={height}
				ratio={ratio}
				width={width}
				margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1}
					yExtents={d => [d.high, d.low]}
				>
					<XAxis
						axisAt="bottom"
						orient="bottom"
						{...gridProps}
						{...xGrid}
						stroke="white" tickStroke="white"
					/>
					<YAxis
						axisAt="right"
						orient="right"
						ticks={5}
						{...gridProps}
						{...yGrid}
						stroke="white" tickStroke="white"
					/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<LineSeries
						yAccessor={d => d.close}
						interpolation={interpolation}
						stroke="#ff7f0e"
					/>
					<OHLCTooltip forChart={1} origin={[-40, 0]}/>
				</Chart>

				<CrossHairCursor />
			</ChartCanvas>

		);
	}
}

LineAndScatterChartGrid.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineAndScatterChartGrid.defaultProps = {
	type: "svg",
};
LineAndScatterChartGrid = fitWidth(LineAndScatterChartGrid);

export default LineAndScatterChartGrid;
