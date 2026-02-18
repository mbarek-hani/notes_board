type ChartProps = {
	title: string;
	badge: string;
	children: React.ReactNode;
};

function Chart({ title, badge, children }: ChartProps) {
	return (
		<div className="cardStyle">
			<div className="cardHeaderRow">
				<h3 className="cardTitle">{title}</h3>
				<span className="cardBadge">{badge}</span>
			</div>
			<div style={{ height: 220 }}>{children}</div>
		</div>
	);
}

export default Chart;
